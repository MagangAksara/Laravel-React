const getCurrentLocationAndCalculatePickup = () => {
    if (!navigator.geolocation) {
        alert("Browser tidak mendukung geolokasi.");
        return;
    }
    setLoadingPickup(true);
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;

            try {
                const res = await fetch(`/api/calculatePickupFee`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-CSRF-TOKEN": csrf_token,
                    },
                    body: JSON.stringify({
                        customer_lat: latitude,
                        customer_lon: longitude,
                        owner_id: car.owner_id,
                    }),
                });

                const data = await res.json();
                if (res.ok) {
                    setPickupFee(data.pickup_fee);
                } else {
                    alert(data.message || "Gagal menghitung biaya pickup.");
                }
            } catch (error) {
                console.error(error);
                alert("Terjadi kesalahan saat menghitung biaya pickup.");
            } finally {
                setLoadingPickup(false);
            }
        },
        (err) => {
            alert("Gagal mengambil lokasi: " + err.message);
            setLoadingPickup(false);
        }
    );
};
