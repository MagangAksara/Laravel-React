import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ImportantInformation = ({
    formData,
    handleInputChange,
    isAvailable
}) => {

    return (
        <div className="space-y-4 ">
            <div>
                <Label htmlFor="beforeBooking">
                    Before Booking
                </Label>
                <Textarea
                    id="beforeBooking"
                    name="beforeBooking"
                    disabled={!isAvailable}
                    rows={5}
                    placeholder="Enter information for the customer before they book..."
                    value={formData.beforeBooking || ""}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <Label htmlFor="afterBooking">After Booking</Label>
                <Textarea
                    id="afterBooking"
                    name="afterBooking"
                    rows={5}
                    disabled={!isAvailable}
                    placeholder="Enter information for the customer after they have booked..."
                    value={formData.afterBooking || ""}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <Label htmlFor="duringPickUp">During Pick Up</Label>
                <Textarea
                    id="duringPickUp"
                    name="duringPickUp"
                    rows={5}
                    disabled={!isAvailable}
                    placeholder="Enter information for the customer when they pick up the car..."
                    value={formData.duringPickup || ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}

export default ImportantInformation;
