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
            value={formData.beforeBooking || "Be sure to read the rental terms"}
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
            value={formData.afterBooking || "The provider will contact the driver via WhatsApp to request photos of some mandatory documents."}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="duringPickUp">At Pick Up</Label>
          <Textarea
            id="duringPickUp"
            name="duringPickUp"
            rows={5}
            placeholder="Enter information for the customer when they pick up the car..."
            value={formData.duringPickUp || "Bring your ID card, driver\'s license, and any other documents required by the rental company.\nWhen you meet with the rental staff, inspect the car\'s condition with them.\nAfterward, read and sign the rental agreement."}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ImportantInfoForm;
