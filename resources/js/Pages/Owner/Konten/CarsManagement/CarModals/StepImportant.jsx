import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // kalau kamu ada komponen ini di shadcn/ui

const ImportantInfoForm = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-lg text-center font-semibold mb-4">2. Important Information</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="beforeBooking">Before Booking</Label>
          <Textarea
            id="beforeBooking"
            name="beforeBooking"
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
            placeholder="Enter information for the customer after they have booked..."
            value={formData.afterBooking || ""}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="atPickUp">At Pick Up</Label>
          <Textarea
            id="atPickUp"
            name="atPickUp"
            rows={5}
            placeholder="Enter information for the customer when they pick up the car..."
            value={formData.atPickUp || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ImportantInfoForm;
