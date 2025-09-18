import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; 

const Policies = ({
    formData,
    handleInputChange,
    isAvailable, 
}) => {

    return (
        <div className="space-y-4 ">
            <div>
                <Label htmlFor="beforePickup">Before Pickup</Label>
                <Textarea
                    id="beforePickup"
                    name="beforePickup"
                    rows={5}
                    disabled={!isAvailable}
                    placeholder="Enter policies for the customer before they pick up the car..."
                    value={formData.beforePickup || ""}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <Label htmlFor="atPickUp">At Pickup</Label>
                <Textarea
                    id="atPickUp"
                    name="atPickUp"
                    rows={5}
                    disabled={!isAvailable}
                    placeholder="Enter policies for the customer at the time of pickup..."
                    value={formData.atPickUp || ""}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <Label htmlFor="usage">Usage</Label>
                <Textarea
                    id="usage"
                    name="usage"
                    rows={5}
                    disabled={!isAvailable}
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
                    disabled={!isAvailable}
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
                    // disabled={!isAvailable}
                    placeholder="Enter policies for overtime charges or extensions..."
                    value={formData.overtime || ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}

export default Policies;