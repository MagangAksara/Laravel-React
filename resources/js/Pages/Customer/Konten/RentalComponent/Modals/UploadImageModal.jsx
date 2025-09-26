import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { X, ArrowUpFromLine, Camera } from "lucide-react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import axios from "axios";

const UploadImageModal = ({ open, onClose, order }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleUpload = async () => {
        if (images.length === 0) {
            toast.error("Please select at least one image!");
            return;
        }

        const formData = new FormData();
        images.forEach((img) => {
            formData.append("images[]", img.file);
        });

        setLoading(true);
        try {
            await axios.post(route("rental.uploadRentalImages", order.id), formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Images uploaded successfully!");
            setImages([]);
            onClose();
        } catch (error) {
            toast.error("Failed to upload images.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg">

                <DialogTitle className="flex justify-center  font-bold text-2xl">Upload Images</DialogTitle>
                <DialogDescription className="flex flex-row justify-between font-medium">
                    <span className=" text-gray-500 mr-2">Booking ID {order.booking_id}</span>
                    <span className="text-gray-500">{order.date}</span>
                </DialogDescription>

                <div className="text-sm space-y-1">
                    <div className="bg-sky-100 text-gray-600 px-4 py-2 rounded-xl mb-4 text-sm">
                        Please upload several photos of the car (front, back, side, wheels, trunk, interior, etc).
                        Once uploaded, the photos cannot be edited or deleted.
                    </div>

                    {/* Upload Input */}
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

                    {/* Upload button */}
                    <div className="flex justify-end pt-3">
                        <Button
                            onClick={handleUpload}
                            disabled={loading}
                            className="w-auto px-8 bg-blue-400 hover:bg-blue-600 text-white"
                        >
                            {loading ? "Uploading..." : "Upload"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
};

export default UploadImageModal;
