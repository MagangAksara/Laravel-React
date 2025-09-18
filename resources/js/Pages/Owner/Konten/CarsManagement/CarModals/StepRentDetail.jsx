import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const StepRentDetail = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-lg text-center font-semibold mb-4">4. Rent Detail</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            name="address"
            rows={5} 
            placeholder="Enter the pickup address for the car..."
            value={formData.address || ""}
            onChange={handleInputChange}
          />
          <a href="#" className="text-blue-500 text-sm mt-2 inline-block">
            Change your address
          </a>
        </div>
      </div>
    </div>
  );
};

export default StepRentDetail;
