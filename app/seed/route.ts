import bcrypt from "bcrypt";
import postgres from "postgres";
import {
  invoices,
  customers,
  revenue,
  users,
} from "@/app/lib/placeholder-data";

// Pastikan env var benar: POSTGRES_URL
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  // 🔥 HAPUS SEMUA DATA LAMA
  await sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;

  const inserted = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword});
      `;
    })
  );

  return inserted;
}

async function seedCustomers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  // 🔥 HAPUS SEMUA DATA LAMA
  await sql`TRUNCATE TABLE customers RESTART IDENTITY CASCADE`;

  const inserted = await Promise.all(
    customers.map(
      (customer) =>
        sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url});
      `
    )
  );

  return inserted;
}

async function seedInvoices() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  // 🔥 HAPUS SEMUA DATA LAMA
  await sql`TRUNCATE TABLE invoices RESTART IDENTITY CASCADE`;

  const inserted = await Promise.all(
    invoices.map(
      (invoice) =>
        sql`
        INSERT INTO invoices (id, customer_id, amount, status, date)
        VALUES (
          uuid_generate_v4(),
          ${invoice.customer_id},
          ${invoice.amount},
          ${invoice.status},
          ${invoice.date}
        );
      `
    )
  );

  return inserted;
}

async function seedRevenue() {
  await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  // 🔥 HAPUS SEMUA DATA LAMA
  await sql`TRUNCATE TABLE revenue;`;

  const inserted = await Promise.all(
    revenue.map(
      (rev) =>
        sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue});
      `
    )
  );

  return inserted;
}

export async function GET() {
  try {
    // Jalankan semua seeding dalam satu transaksi (opsional)
    await sql.begin(async (sqlTx) => {
      // Gunakan sqlTx agar semua operasi dalam transaksi yang sama
      await seedUsers();
      await seedCustomers();
      await seedInvoices();
      await seedRevenue();
    });

    return new Response(
      JSON.stringify({ message: "Database reset and seeded successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Seeding error:", error);
    return new Response(JSON.stringify({ error: "Failed to seed database" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    // Tutup koneksi (opsional di dev, tapi baik untuk mencegah leak)
    await sql.end();
  }
}
