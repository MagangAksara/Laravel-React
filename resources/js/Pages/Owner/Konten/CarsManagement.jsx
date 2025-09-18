import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { Head, Link, router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/assets/SearchBox";
import useDebounce from "@/Pages/Customer/Hooks/useDebounce";
import AddModel from "./CarsManagement/CarModals/AddModels";
import AddBrand from "./CarsManagement/CarModals/AddBrand";
import DeletePopUp from "./CarsManagement/CarModals/Delete";
import AddCarForm from "./CarsManagement/CarModals/AddCar"; // pastikan path sesuai
import { Trash2 } from "lucide-react";

const CarsManagement = () => {
  const { props } = usePage();
  const { cars } = props;
  const [activeTab, setActiveTab] = useState("basic");

  // pop up delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleDeleteClick = (car) => {
    setSelectedCar(car);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedCar) return;

    router.delete(route("owner.cars.destroy", selectedCar.id), {
      onSuccess: () => {
        setIsDeleteOpen(false);
        alert("Car deleted successfully");
      },
      onError: (error) => {
        console.error(error);
        alert("Failed to delete car");
      },
    });
  };

  // search
  const [searchValue, setSearchValue] = useState("");
  // data yang sudah difilter
  const filteredCars = cars.filter((car) => {
    const name = `${car.brand} ${car.model} ${car.type} ${car.plate_number}`.toLowerCase();
    return name.includes(searchValue.toLowerCase());
  });
  const [results, setResults] = useState([]); // 🔹 state untuk hasil search
  const [showResults, setShowResults] = useState(false);

  const debouncedSearch = useDebounce(searchValue, 500);

  // state modal
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  const [isCarModalOpen, setIsCarModalOpen] = useState(false);

  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      fetch(`/search?q=${debouncedSearch}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setShowResults(true);
        })
        .catch((err) => console.error("Search error:", err));
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [debouncedSearch]);

  return (
    <>
      <Head title="Cars Management" />
      <Layout>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cars Management</h2>
          {/* <Button
            className="border border-blue-500 text-blue-500 bg-transparent
                hover:bg-blue-500 hover:text-white
                data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            onClick={() => setIsCarModalOpen(true)}
          >
            Add Car +
          </Button> */}
          {/* Modal Add Car */}
          {/* <AddCarForm
            isOpen={isCarModalOpen}
            onClose={() => setIsCarModalOpen(false)}
          /> */}
        </div>
        <div className="flex justify-between items-center mb-4">
          <SearchBox
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search brand, model, type, plate number..."
          />
          <Button
            className="border border-blue-500 text-blue-500 bg-transparent
                hover:bg-blue-500 hover:text-white
                data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            onClick={() => setIsCarModalOpen(true)}
          >
            Add Car +
          </Button>
          {/* Modal Add Car */}
          <AddCarForm
            isOpen={isCarModalOpen}
            onClose={() => setIsCarModalOpen(false)}
          />
        </div>

        <Card>
          <div className="flex flex-row justify-end gap-2 mr-6 mb-3 my-3">
            <Button
              variant="outline"
              className="bg-blue-500 text-white border-blue-500 "
              onClick={() => setIsModelModalOpen(true)}
            >
              Add Model
            </Button>
            <Button
              variant="outline"
              className="bg-blue-500 text-white border-blue-500 "
              onClick={() => setIsBrandModalOpen(true)}
            >
              Add Brand
            </Button>
          </div>

          {/* Modal */}
          <AddModel
            isOpen={isModelModalOpen}
            onClose={() => setIsModelModalOpen(false)}
          />
          <AddBrand
            isOpen={isBrandModalOpen}
            onClose={() => setIsBrandModalOpen(false)}
          />

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">No</th>
                    <th className="border p-2">Photo</th>
                    <th className="border p-2">Plate Number</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Price/day</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCars.map((car, i) => (
                    <tr
                      key={car.id}
                      className="text-center"
                    >
                      <td className="border p-2">
                        {i + 1}
                      </td>
                      <td className="border p-2">
                        {/* Cek apakah photo adalah url langsung atau file di public */}
                        {(() => {
                          // Regex sederhana untuk cek apakah string adalah url
                          const isUrl = /^(https?:)?\/\//i.test(car.photo);
                          // Regex untuk cek ekstensi gambar
                          const isImage = /\.(jpe?g|png|gif|bmp|webp|svg)$/i.test(car.photo);

                          let src = "";
                          if (isUrl) {
                            src = car.photo;
                          } else if (isImage) {
                            src = `/storage/${car.photo}`;
                          } else {
                            src = car.photo; // fallback
                          }
                          return (
                            <img
                              src={src}
                              alt={car.brand}
                              className="max-w-20 h-auto mx-auto rounded-md"
                            />
                          );
                        })()}
                      </td>
                      <td className="border p-2">
                        {car.plate_number}
                      </td>

                      <td className="border p-2">
                        {car.brand} {car.model} {car.type}

                      </td>
                      <td className="border p-2">
                        Rp {car.price_day.toLocaleString()}
                      </td>
                      <td className="border p-2 w-40 text-center">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={route(
                              "owner.cars.detail",
                              car.id
                            )}
                          >
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs">
                              View Details
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleDeleteClick(
                                car
                              )
                            }
                            className="w-10  h-10"
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <DeletePopUp
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            car={selectedCar}
            onDelete={handleConfirmDelete}
          />
        </Card>
      </Layout >
    </>
  );
};

export default CarsManagement;