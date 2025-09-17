import React, { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/Components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/Components/ui/popover";
import { Checkbox } from "@/Components/ui/checkbox";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

import { X, ArrowUpFromLine, Camera, ChevronDown, CircleAlert } from "lucide-react";


const ExtraPaymentModal = ({ open, onClose, order }) => {
    const [images, setImages] = useState([]);
    const [selected, setSelected] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [value, setValue] = useState("");

    const toggleOption = (value, checked) => {
        let newSelected;
        if (checked) {
            newSelected = [...selected, value];
        } else {
            newSelected = selected.filter((v) => v !== value);
        }
        setSelected(newSelected);
    };

    const options = ["Hard Damage", "Small Damage"];

    const formatNumber = (num) => {
        if (!num) return "";
        return new Intl.NumberFormat("id-ID").format(num);
    };

    const handleChange = (e) => {
        // Ambil hanya angka
        const rawValue = e.target.value.replace(/\D/g, "");
        setValue(formatNumber(rawValue));
    };

    if (!order) return null;

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...newImages]);
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="max-w-lg p-6 rounded-lg shadow-lg overflow-y-auto"
                style={{ scrollbarWidth: 'none' }}
            >

                <DialogTitle className="flex justify-center  font-bold text-2xl">Extra Payment</DialogTitle>
                <DialogDescription className="flex flex-row justify-between font-medium">
                    <span className=" text-gray-500 mr-2">Booking ID </span>
                    <span className="text-gray-500">{order.date}</span>
                </DialogDescription>

                <div className="text-sm space-y-1">
                    {/* alert Section */}
                    <div className="flex flex-row bg-sky-100 text-gray-600 px-4 py-2 rounded-xl mb-4 text-sm gap-3">
                        <CircleAlert className="w-20" />
                        <span>Please upload several photos of the car, such as front, back, side views, wheels, trunk, interior, and more. Once uploaded, the photos cannot be edited or deleted, so make sure everything is correct before submitting.</span>
                    </div>

                    {/* detail section */}
                    <div className="flex flex-col gap-4 pb-4">
                        <label>
                            <span>Demage Type</span>
                            <Popover open={popoverOpen} onOpenChange={setPopoverOpen} modal={true}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between text-gray-400 font-normal">
                                        {selected.length > 0 ? selected.join(", ") : "Select Damage Level"}
                                        <ChevronDown />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-56 p-2 space-y-3"
                                    side="bottom"
                                    align="start"
                                >
                                    {options.map((opt) => (
                                        <div key={opt} className="flex items-center gap-2">
                                            <Checkbox
                                                id={`damage-${opt}`}
                                                checked={selected.includes(opt)}
                                                onCheckedChange={(checked) => toggleOption(opt, checked)}
                                                className="bg-white data-[state=checked]:bg-blue-400 data-[state=checked]:border-gray-200"
                                            />
                                            <Label htmlFor={`damage-${opt}`}>{opt}</Label>
                                        </div>
                                    ))}
                                    {/* <Button
                                        variant="secondary"
                                        className="mt-2 w-full"
                                        onClick={() => setPopoverOpen(false)}
                                    >
                                        Apply
                                    </Button> */}
                                </PopoverContent>
                            </Popover>
                        </label>

                        <label>
                            <span className="font-medium">Description</span>
                            <Textarea
                                type="text"
                                placeholder="Description"
                                className="w-full border rounded p-2"
                            />
                        </label>

                        <label>
                            <span className="font-medium">Damage Fee</span>
                            <Input
                                type="text"
                                inputMode="numeric"
                                placeholder="2.000.000"
                                value={value}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </label>
                    </div>

                    {/* Upload Section */}
                    <label className="w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <span className="text-gray-500 flex items-center">
                            Upload Picture
                            <ArrowUpFromLine className="ml-1 w-4" />
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>

                    {/* Thumbnails */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {images.map((img, index) => (
                            <div key={index} className="relative w-16 h-16">
                                <img
                                    src={img.url}
                                    alt={`upload-${index}`}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}

                        {/* Placeholder slots */}
                        {Array.from({ length: Math.max(0, (order.max_images || 6) - images.length) }).map((_, i) => (
                            <div
                                key={i}
                                className="w-16 h-16 flex items-center justify-center border-2 border-dashed border-gray-300 rounded text-gray-400"
                            >
                                <Camera />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end pt-3">
                        <Button className="w-auto px-8 bg-blue-400 hover:bg-blue-600 text-white">
                            Upload
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
};

export default ExtraPaymentModal;
