import React, { useState } from "react";
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

// import step components
import StepBasic from "./StepBasic";
import StepImportant from "./StepImportant";
import StepPolicies from "./StepPolicies";
import StepRentDetail from "./StepRentDetail";
import ImportantInfoForm from "./StepImportant";

const AddCarForm = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);

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
        city: "",
        price: "",
        hasDriver: true,
        driverFee: "",
        overtimeFee: "",
        // Important info
        beforeBooking: "",
        afterBooking: "",
        atPickUp: "",
        // Policies
        beforePickup: "",
        atPickup: "",
        usage: "",
        return: "",
        overtime: "",
        // Rent
        address: "",
        carImage: [],
    });

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
            "city",
            "price",
        ],
        2: ["beforeBooking", "afterBooking", "atPickUp"],
        3: ["beforePickup", "atPickup", "usage", "return", "overtime"],
        4: ["address"],
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

    const nextStep = () => setStep((s) => Math.min(s + 1, 4));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const handleFinish = () => {
        // kirim data ke backend di sini
        console.log("FINAL SUBMIT:", formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Add New Car
                    </DialogTitle>
                </DialogHeader>

                {/* Header Steps */}
                <div className="flex items-center justify-between mb-6 w-full">
                    {[
                        { icon: Settings, label: "Basic Information" },
                        { icon: AlertTriangle, label: "Important Information" },
                        { icon: FileText, label: "Policies" },
                        { icon: CheckCircle, label: "Rent" },
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
                                {current < 4 && (
                                    <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Step Content */}

                {step === 1 && (
                    <StepBasic
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleImageChange={handleImageChange}
                        setFormData={setFormData}
                    />
                )}
                {step === 2 && (
                    <ImportantInfoForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                )}
                {step === 3 && (
                    <StepPolicies
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                )}
                {step === 4 && (
                    <StepRentDetail
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                )}

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
                    {step < 4 ? (
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
                    ) : (
                        <Button
                            className={`text-white ${
                                isStepValid
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                            onClick={handleFinish}
                            disabled={!isStepValid}
                        >
                            Finish
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddCarForm;
