import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/Components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/Components/ui/popover";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

import { X, ArrowUpFromLine, Camera, ChevronDown, CircleAlert } from "lucide-react";

const ExtraPaymentModal = ({ open, onClose, order, onSubmit }) => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [value, setValue] = useState("");

  const options = ["Hard Damage", "Small Damage"];

  const formatNumber = (num) => (num ? new Intl.NumberFormat("id-ID").format(num) : "");

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setValue(formatNumber(rawValue));
  };

  if (!order) return null;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => setImages((prev) => prev.filter((_, i) => i !== index));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg p-6 rounded-lg shadow-lg overflow-x-auto max-h-[95vh]"
        style={{ scrollbarWidth: 'none' }}
      >
        <DialogTitle className="flex justify-center font-bold text-2xl">Extra Payment</DialogTitle>
        <DialogDescription className="flex flex-row justify-between font-medium">
          <span className="text-gray-500 mr-2">Booking ID </span>
          <span className="text-gray-500">{order.date}</span>
        </DialogDescription>

        <form onSubmit={(e) => onSubmit(e, { images, selected, value })}>
          <div className="text-sm space-y-1">
            {/* Alert Section */}
            <div className="flex flex-row bg-sky-100 text-gray-600 px-4 py-2 rounded-xl mb-4 text-sm gap-3">
              <CircleAlert className="w-20" />
              <span>Please upload several photos of the car, such as front, back, side views, wheels, trunk, interior, and more. Once uploaded, the photos cannot be edited or deleted, so make sure everything is correct before submitting.</span>
            </div>

            {/* Detail Section */}
            <div className="flex flex-col gap-4 pb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span>Long Delay</span>
                  <div className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-700">
                    {order.fine_time} hours
                  </div>
                </div>
                <div>
                  <span>Punishment (Editable)</span>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={formatNumber(order.fine_amount)}
                    tabIndex={-1}
                  />
                </div>
              </div>

              {/* Damage Type Popover */}
              <div className="flex flex-col gap-2">
                <span>Damage Type</span>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {selected.length > 0 ? selected.join(", ") : "Select Damage Level"}
                      <ChevronDown />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    side="bottom"
                    sideOffset={8}
                    className="pointer-events-auto select-auto z-50 w-auto p-2"
                  >
                    <div className="flex flex-col">
                      {options.map((option) => (
                        <div
                          key={option}
                          className={`cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 ${selected.includes(option) ? "bg-blue-200 font-medium" : ""
                            }`}
                          onClick={() => {
                            setSelected([option]);
                            setPopoverOpen(false);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Damage Fee */}
              <div>
                <span className="font-medium">Damage Fee</span>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="2.000.000"
                  value={value}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Description */}
              <div>
                <span className="font-medium">Description</span>
                <Textarea name="description" placeholder="Description" className="w-full border rounded p-2" />
              </div>
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
                  <img src={img.url} alt={`upload-${index}`} className="w-16 h-16 object-cover rounded" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
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
              <Button type="submit" className="w-auto px-8 bg-blue-400 hover:bg-blue-600 text-white">
                Upload
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExtraPaymentModal;
