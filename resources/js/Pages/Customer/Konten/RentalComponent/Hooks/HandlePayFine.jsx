import { router } from '@inertiajs/react';

// resources/js/Pages/Customer/BookingComponent/HandlePayNow.jsx
export default async function HandlePayFine(
    {
        car,
        customerEmail,
        setLoading,
        totalPayment,
        rentalId,
        fineId,
    }
) {

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
            credentials: "include",
        });

        // 2. Ambil nilai XSRF-TOKEN dari cookie browser
        const xsrfToken = getCookie("XSRF-TOKEN");

        // 3. Kirim request ke API untuk buat pembayaran
        const paymentResponse = await fetch("http://127.0.0.1:8000/api/payment/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
            },
            credentials: "include",
            body: JSON.stringify({
                amount: totalPayment, // ⬅️ pakai dari props
                description: `Penalty Rental ${car.brand} ${car.model}`,
                payer_email: customerEmail,
            }),
        });

        if (!paymentResponse.ok) {
            throw new Error(`HTTP error! Status: ${paymentResponse.status}`);
        }

        const paymentResult = await paymentResponse.json();

        // 4. Simpan database (route web)
        const rentalResponse = await fetch(
            route("forRentalandFine.updateForFine", rentalId),
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
                },
                credentials: "include",
                body: JSON.stringify({
                    payment_id: paymentResult.id, // ✅ kirim payment id baru
                }),
            }
        );

        if (!rentalResponse.ok) {
            throw new Error(`Gagal menyimpan rental! Status: ${rentalResponse.status}`);
        }

        // 5. Redirect ke Xendit checkout link
        if (paymentResult.checkout_link) {
            window.location.href = paymentResult.checkout_link;
        } else {
            alert("Gagal membuat pembayaran: checkout_link tidak ditemukan.");
        }

    } catch (error) {
        console.error("Payment/Rental error:", error.message, error);
        alert("Terjadi kesalahan saat proses pembayaran.");
    } finally {
        setLoading(false);
    }
}