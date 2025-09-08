import { useEffect, useState } from "react";

const getUnique = (data, key, mapper) =>
  [...new Set(data.map((car) => car[key]))]
    .filter(Boolean)
    .map(mapper || ((v) => v));

export default function useCarFilters(carsData, filters) {
  const [filteredCars, setFilteredCars] = useState(carsData);

  const filterOptions = {
    brands: getUnique(carsData, "brand"),
    models: getUnique(carsData, "model"),
    types: getUnique(carsData, "type"),
    transmissions: getUnique(carsData, "type_transmisi"),
    seats: getUnique(carsData, "capacity", (seat) => ({
      value: seat.toString(),
      label: `${seat} seats`,
    })),
    fuels: getUnique(carsData, "fuel_type"),
    cities: getUnique(carsData, "owner_city"),
  };

  useEffect(() => {
    let data = [...carsData];

    const filterFns = {
      brand: (c, v) => c.brand === v,
      city: (c, v) => c.owner_city === v,
      transmission: (c, v) => c.type_transmisi === v,
      seats: (c, v) => c.capacity === v,
      fuel: (c, v) => c.fuel_type === v,
      available: (c, v) => v && c.is_available,
      min_price: (c, v) => c.price >= v,
      max_price: (c, v) => c.price <= v,
      rentalDate: (c, { start_date, end_date }) =>
        !c.rentals.some((r) => {
          const start = new Date(r.start_date);
          const end = new Date(r.end_date);
          return (
            start <= new Date(end_date) &&
            end >= new Date(start_date) &&
            ["on_rent", "waiting_for_check", "confirmed_payment"].includes(
              r.status
            )
          );
        }),
    };

    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue;
      if (key === "start_date" || key === "end_date") continue;

      if (key === "rentalDate") {
        data = data.filter((c) =>
          filterFns.rentalDate(c, {
            start_date: filters.start_date,
            end_date: filters.end_date,
          })
        );
      } else {
        data = data.filter((c) => filterFns[key]?.(c, value));
      }
    }

    setFilteredCars(data);
  }, [filters, carsData]);

  return { filteredCars, filterOptions };
}
