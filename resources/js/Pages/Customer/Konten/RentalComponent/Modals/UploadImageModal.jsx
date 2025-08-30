import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { X } from "lucide-react";

const UploadImageModal = ({ open, onClose, order }) => {
    const [images, setImages] = useState([]);

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
            <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg">

                <DialogTitle className="flex justify-center  font-bold text-2xl">Upload Images</DialogTitle>
                <DialogDescription className="flex flex-row justify-between">
                    <div className="font-medium">
                        <span className=" text-gray-500 mr-2">Booking ID</span>
                        <span>{order.booking_id}</span>
                    </div>
                    <span className="text-gray-500">{order.date}</span>
                </DialogDescription>

                <div className="mt-2 text-sm space-y-1">
                    <div className="bg-blue-200 text-gray-600 px-4 py-2 rounded mb-4 text-sm">
                        Please upload several photos of the car, such as front, back, side views, wheels, trunk, interior, and more. Once uploaded, the photos cannot be edited or deleted, so make sure everything is correct before submitting.
                    </div>

                    {/* alert Section */}
                    <label className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <span className="text-gray-500">Upload Picture ⬆️</span>
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
                                📷
                            </div>
                        ))}
                        <div className="flex justify-end pt-2">
                            <Button className="w-auto px-8 bg-blue-500 hover:bg-blue-600 text-white">
                                Upload
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
};

export default UploadImageModal;
