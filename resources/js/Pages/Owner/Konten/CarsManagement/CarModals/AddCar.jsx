import React, { useState, useEffect  } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings, AlertTriangle, FileText, CheckCircle } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

// import step components
import StepBasic from "./StepBasic";
import StepImportant from "./StepImportant";
import StepPolicies from "./StepPolicies";
// import StepRentDetail from "./StepRentDetail";
import ImportantInfoForm from "./StepImportant";



const AddCarForm = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);

    const handleFinish = (e) => {
        e.preventDefault();

        console.log("POST URL:", route("owner.cars.storeStepBasic"));

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

        router.post(route("owner.cars.storeStepBasic"), data, {
            forceFormData: true,
            onSuccess: () => {
                onClose(); // tutup dialog

                // alert("Car added successfully!");
                router.visit(route("owner.cars.management"), {
                onFinish: () => {
                    alert("Car added successfully!"); // muncul setelah redirect
                },
            });
            },
            onError: (errors) => {
                console.error(errors);
                alert("Failed to save car. Check console for errors.");
            },
        });
    };

        // simpen nilai awal form di luar state
    const initialFormData = {
        plateNumber: "",
        brand: "",
        model: "",
        type: "",
        fuel: "",
        transmission: "",
        seat: "",
        year: "",
        color: "",
        // city: "",
        price: "",
        hasDriver: true,
        driverFee: "",
        overtimeFee: "",
        // Important info
        beforeBooking: "Be sure to read the rental terms",
        afterBooking: "The provider will contact the driver via WhatsApp to request photos of some mandatory documents.",
        duringPickUp: "Bring your ID card, driver's license, and any other documents required by the rental company.\nWhen you meet with the rental staff, inspect the car's condition with them.\nAfterward, read and sign the rental agreement.",
        // Policies
        beforePickup: "",
        atPickup: "",
        usage: "",
        return: "",
        overtime: "",
        // Rent
        // address: "",
        carImage: [],
    };


    // <-- pastikan state formData ada di sini
    const [formData, setFormData] = useState({
        plateNumber: "",
        brand: "",
        model: "",
        type: "",
        fuel: "",
        transmission: "",
        seat: "",
        year: "",
        color: "",
        // city: "",
        price: "",
        hasDriver: true,
        driverFee: "",
        overtimeFee: "",
        // Important info
        beforeBooking: "",
        afterBooking: "",
        duringPickUp: "",
        // Policies
        beforePickup: "",
        atPickup: "",
        usage: "",
        return: "",
        overtime: "",
        // Rent
        // address: "",
        carImage: [],
    });

    useEffect(() => {
    if (!isOpen) {
        setFormData(initialFormData);
        setStep(1);
    }
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "radio") {
            // contoh radio hasDriver withDriver/withoutDriver
            setFormData((prev) => ({
                ...prev,
                [name]: value === "withDriver",
            }));
            return;
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    //  handle image
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // convert FileList -> Array
        setFormData((prev) => ({
            ...prev,
            // Menggabungkan file lama dengan file baru
            carImage: [...prev.carImage, ...files],
        }));
    };

    //  validasi per-step
    const stepRequiredFields = {
        1: [
            "plateNumber",
            "brand",
            "model",
            "type",
            "fuel",
            "transmission",
            "seat",
            "year",
            "color",
            // "city",
            "price",
        ],
        2: ["beforeBooking", "afterBooking", "duringPickUp"],
        3: ["beforePickup", "atPickup", "usage", "return", "overtime"],
        // 4: ["address"],
    };

    //   pengecekan agar tidak kosong dan wajib diisi
    const isStepValid = stepRequiredFields[step].every((field) => {
        const value = formData[field];

        // Kalau array, cek panjangnya
        if (Array.isArray(value)) {
            return value.length > 0;
        }

        // Kalau boolean, selalu valid
        if (typeof value === "boolean") {
            return true;
        }

        // Kalau number atau string, pastikan tidak kosong
        return value !== "" && value !== null && value !== undefined;
    });
    console.log("Step:", step, "Data:", formData, "Valid:", isStepValid);


    const nextStep = () => setStep((s) => Math.min(s + 1, 3));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    // const handleFinish = () => {
    //     // kirim data ke backend di sini
    //     console.log("FINAL SUBMIT:", formData);
    //     onClose();
    // };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Add New Car
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription/>

                {/* Header Steps */}
                <div className="flex items-center justify-between mb-6 w-full">
                    {[
                        { icon: Settings, label: "Basic Information" },
                        { icon: AlertTriangle, label: "Important Information" },
                        { icon: FileText, label: "Policies" },
                        // { icon: CheckCircle, label: "Rent" },
                    ].map((s, i) => {
                        const Icon = s.icon;
                        const current = i + 1;
                        return (
                            <React.Fragment key={s.label}>
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 flex items-center justify-center rounded-full ${
                                            step === current
                                                ? "bg-blue-100 text-blue-500"
                                                : "bg-gray-100 text-gray-400"
                                        }`}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    {/* <span className="mt-2 text-sm font-medium text-center">{s.label}</span> */}
                                </div>
                                {current < 3 && (
                                    <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Step Content */}
                <form onSubmit={handleFinish}>
                    {step === 1 && (
                        <StepBasic
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleImageChange={handleImageChange}
                            setFormData={setFormData}
                            setStep={setStep}
                        />
                    )}
                    {step === 2 && (
                        <ImportantInfoForm
                            formData={formData}
                            handleInputChange={handleInputChange}
                            setStep={setStep}
                        />
                    )}
                    {step === 3 && (
                        <StepPolicies
                            formData={formData}
                            handleInputChange={handleInputChange}
                        />
                    )}
                    {/* {step === 4 && (
                        <StepRentDetail
                            formData={formData}
                            handleInputChange={handleInputChange}
                        />
                    )} */}

                    {/* Footer Buttons */}
                    <div className="flex justify-between mt-6">
                        {step > 1 && (
                            <Button
                                variant="outline"
                                className="border border-black"
                                onClick={prevStep}
                            >
                                Back
                            </Button>
                        )}
                        {step < 3 ? (
                            <>
                            <Button
                                className={`text-white ${
                                    isStepValid
                                        ? "bg-blue-500 hover:bg-blue-600"
                                        : "bg-gray-400 cursor-not-allowed"
                                }`}
                                onClick={nextStep}
                                disabled={!isStepValid}
                            >
                                Next
                            </Button>
                            {/* label yang akan menampilkan peringatan seandainya terdapat input atau select yang belum dipilih */}
                            <Label></Label>
                            </>
                        ) : (
                            <Button
                                className={`text-white ${
                                    isStepValid
                                        ? "bg-green-500 hover:bg-green-600"
                                        : "bg-gray-400 cursor-not-allowed"
                                }`}
                                type="submit"
                                disabled={!isStepValid}
                            >
                                Finish
                            </Button>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddCarForm;