import { Head } from "@inertiajs/react";
import Layout from "../../../Layout";

export default function Success() {
  return (
    <>
      <Head title="Success" />
      <Layout>
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold text-green-600">Pembayaran Berhasil 🎉</h1>
          <p>Terima kasih sudah melakukan pembayaran.</p>
        </div>
      </Layout>
    </>
  );
}
