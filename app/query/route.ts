import postgres from "postgres";

// Inisialisasi koneksi database
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// Fungsi untuk mengambil data dari database
async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

// Handler GET API Route
export async function GET() {
  // Blok placeholder yang dihapus/di-comment

  // Sekarang, kode ini akan dijalankan:
  try {
    // Jalankan query dan kirim hasilnya sebagai JSON
    return Response.json(await listInvoices());
  } catch (error) {
    // Tangani error jika koneksi/query gagal
    console.error("Database Error:", error);
    return Response.json(
      { error: "Failed to fetch invoices." },
      { status: 500 }
    );
  }
}
