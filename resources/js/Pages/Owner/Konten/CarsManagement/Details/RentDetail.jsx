import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // kalau kamu ada komponen ini di shadcn/ui
import useCarForm from "../Hooks/useCarForm";

const RentDetail = ({ car }) => {
    const { formData, handleInputChange, isAvailable } = useCarForm(car);

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                    id="address"
                    name="address"
                    rows={5}
                    disabled={!isAvailable}
                    placeholder="Enter the pickup address for the car..."
                    value={formData.address || ""}
                    onChange={handleInputChange}
                />
                <a
                    href="#"
                    className="text-blue-500 text-sm mt-2 inline-block"
                >
                    Change your address
                </a>
            </div>
        </div>
    );
}

export default RentDetail;