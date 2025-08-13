// resources/js/Pages/Customer/BookingComponent/HandlePayNow.jsx
export default async function HandlePayNow({ car, setLoading }) {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  try {
    setLoading(true);

    // 1. Ambil CSRF cookie dari Laravel Sanctum
    await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include", // penting: simpan cookie di browser
    });

    // 2. Ambil nilai XSRF-TOKEN dari cookie browser
    const xsrfToken = getCookie("XSRF-TOKEN");

    // 3. Kirim request ke API untuk buat pembayaran
    const response = await fetch("http://127.0.0.1:8000/api/payment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      },
      credentials: "include", // kirim cookie laravel_session & XSRF-TOKEN
      body: JSON.stringify({
        amount: car.total_payment,
        description: `Rental ${car.brand} ${car.model}`,
        payer_email: "customer@email.com",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (result.checkout_link) {
      window.location.href = result.checkout_link; // redirect ke Xendit
    } else {
      alert("Gagal membuat pembayaran: checkout_link tidak ditemukan.");
    }
  } catch (error) {
    console.error("Payment error:", error);
  } finally {
    setLoading(false);
  }
}
