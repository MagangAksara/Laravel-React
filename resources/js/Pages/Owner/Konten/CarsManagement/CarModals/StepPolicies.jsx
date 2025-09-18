import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const StepPolicies = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-lg text-center font-semibold mb-4">3. Policies</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="beforePickup">Before Pickup</Label>
          <Textarea
            id="beforePickup"
            name="beforePickup"
            rows={5}
            placeholder="Enter policies for the customer before they pick up the car..."
            value={formData.beforePickup || ""}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="atPickup">At Pickup</Label>
          <Textarea
            id="atPickup"
            name="atPickup"
            rows={5}
            placeholder="Enter policies for the customer at the time of pickup..."
            value={formData.atPickup || ""}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="usage">Usage</Label>
          <Textarea
            id="usage"
            name="usage"
            rows={5}
            placeholder="Enter policies regarding car usage, such as mileage limits or restrictions..."
            value={formData.usage || ""}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="return">Return</Label>
          <Textarea
            id="return"
            name="return"
            rows={5}
            placeholder="Enter policies for returning the car, such as fuel level or cleanliness..."
            value={formData.return || ""}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="overtime">Overtime</Label>
          <Textarea
            id="overtime"
            name="overtime"
            rows={5}
            placeholder="Enter policies for overtime charges or extensions..."
            value={formData.overtime || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default StepPolicies;
