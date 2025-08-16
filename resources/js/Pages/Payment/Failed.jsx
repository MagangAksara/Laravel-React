import { Head } from "@inertiajs/react";
import Navbar from "../ComponetGlobal/Navbar";
import PageHeader from "../ComponetGlobal/PageHeader";

export default function Failed() {
  return (
    <>
      <Head title="Success"/>
      <Navbar
        header={<PageHeader/>}
      >
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold text-green-600">Pembayaran Gagal 🎉</h1>
        </div>
      </Navbar>
    </>
  );
}
