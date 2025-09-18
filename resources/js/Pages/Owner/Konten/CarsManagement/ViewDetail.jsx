import React from "react";
import { Link, Head, router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/Components/ui/button";

import Layout from "../../Layout";
import BasicInformation from "./Details/BasicInformation";
import ImportantInformation from "./Details/ImportantInformation";
import Policies from "./Details/Policies";
import useCarForm from "./Hooks/useCarForm";

const CarDetail = ({ car }) => {
    const carForm = useCarForm(car);

    const handleUpdate = (e) => {
        e.preventDefault();
        
        const { formData } = carForm;

        const data = new FormData();
        
        Object.keys(formData).forEach((key) => {
            if (key === "carImage") {
                formData.carImage.forEach((file) => {
                    if (file instanceof File) {
                        data.append("carImage[]", file);
                    }
                });
            } else {
                data.append(key, formData[key]);
            }
        });

        router.post(route("owner.cars.update", car.id), data, {
            forceFormData: true,
            method: "post",
            onSuccess: () => {
                alert("Car updated successfully");
            },
            onError: (errors) => {
                console.error(errors);
                alert("Failed to update car");
            },
        });
    };

    return (
        <>
            <Head title={`Car Detail - ${car.brand}`} />
            <Layout>
                <div className="p-6 max-w-3xl mx-auto border border-gray-300 rounded-xl">
                    {/* Back Button */}
                    <div className="mb-6 flex items-center">
                        <Link
                            href={route("owner.cars.management")}
                            className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Cars Management
                        </Link>
                    </div>

                    <form onSubmit={handleUpdate}>
                        <h2 className="text-lg text-center font-semibold mb-4">
                            1. Basic Information
                        </h2>
                        <BasicInformation {...carForm} />

                        <h2 className="text-lg text-center font-semibold py-4">
                            2. Important Information
                        </h2>
                        <ImportantInformation {...carForm} />

                        <h2 className="text-lg text-center font-semibold py-4">
                            3. Policies
                        </h2>
                        <Policies {...carForm} />

                        {/* <h2 className="text-lg text-center font-semibold py-4">
                            4. Rent Detail
                        </h2>
                        <RentDetail car={car} /> */}

                        <div className="flex justify-end items-end pt-4">
                            <Button
                                type="submit"
                                className="w-30 bg-blue-400 hover:bg-blue-600"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    );
};

export default CarDetail;
