import { Head } from "@inertiajs/react";
import Layout from "../../../Layout";

export default function Failed() {
  return (
    <>
      <Head title="Success"/>
      <Layout>
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold text-green-600">Pembayaran Gagal 🎉</h1>
        </div>
      </Layout>
    </>
  );
}
