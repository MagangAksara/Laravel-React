import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { router, usePage } from "@inertiajs/react";

const ModelModal = ({ isOpen, onClose }) => {
    const { brands } = usePage().props; // ambil brands dari controller inertia

    const [brandId, setBrandId] = useState("");
    const [modelName, setModelName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!brandId || !modelName.trim()) {
            return alert("Please fill all fields");
        }

        router.post(
            "/models",
            { brand_id: brandId, name: modelName },
            {
                onSuccess: () => {
                    alert("Model added successfully");
                    setBrandId("");
                    setModelName("");
                    onClose();
                },
                onError: (errors) => {
                    console.error(errors);
                    alert("Failed to add model");
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogTitle>Add Model Car</DialogTitle>
                <DialogDescription>
                    Please enter the model car details below.
                </DialogDescription>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className="mt-4 space-y-4">
                        <div>
                            <Label htmlFor="brandSelect">Brand</Label>
                            <select
                                id="brandSelect"
                                className="form-select w-full border rounded p-2"
                                value={brandId}
                                onChange={(e) => setBrandId(e.target.value)}
                            >
                                <option value="">Select a brand</option>
                                {brands?.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}

                                {/* Dynamic options here */}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="modelName">Model</Label>
                            <Input
                                id="modelName"
                                placeholder="Enter model name"
                                value={modelName}
                                onChange={(e) => setModelName(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="border border-red-500 text-red-500 bg-transparent "
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-500 text-white"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ModelModal;
