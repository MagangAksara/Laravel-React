import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RentalDateRange from "./RentalDateRange";

const FilterSidebar = () => {
  return (
    <>
      <div className="flex flex-col gap-6 h-auto">
        {/* <div className="w-64 p-4 bg-white rounded-xl shadow-sm border h-auto"> */}
          <RentalDateRange />
        {/* </div> */}
        <div className="w-64 p-4 bg-white rounded-xl shadow-sm border h-auto">
          {/* Brand */}
          <div className="mb-4">
            <Label className="text-base font-semibold">Brand</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Lexus", "Nissan", "Honda", "Daihatsu", "Suzuki"].map((brand) => (
                <Button
                  key={brand}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  {brand}
                </Button>
              ))}
              <Button variant="link" size="sm" className="text-blue-500">See More</Button>
            </div>
          </div>

          {/* Location */}
          <div className="mb-4">
            <Label className="text-base font-semibold">Location</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Malang", "Jember", "Lumajang", "Solo", "Jakarta", "Yogyakarta"].map((loc) => (
                <Button
                  key={loc}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  {loc}
                </Button>
              ))}
              <Button variant="link" size="sm" className="text-blue-500">See More</Button>
            </div>
          </div>

          {/* Transmission */}
          <div className="mb-4">
            <Label className="text-base font-semibold">Transmission</Label>
            <RadioGroup defaultValue="manual" className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual">Manual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automatic" id="automatic" />
                <Label htmlFor="automatic">Automatic</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Seat */}
          <div className="mb-4">
            <Label className="text-base font-semibold">Seat</Label>
            <Input type="number" placeholder="5" className="mt-2" />
          </div>

          {/* Fuel */}
          <div className="mb-4">
            <Label className="text-base font-semibold">Fuel</Label>
            <RadioGroup defaultValue="petrol" className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="petrol" id="petrol" />
                <Label htmlFor="petrol">Petrol</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="diesel" id="diesel" />
                <Label htmlFor="diesel">Diesel</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Available */}
          <div className="mb-4 flex items-center justify-between">
            <Label className="text-base font-semibold">Available Now Only</Label>
            <Switch defaultChecked />
          </div>

          {/* Price */}
          <div className="mb-4">
            <Label className="text-base font-semibold">Price</Label>
            <div className="flex gap-2 mt-2">
              <Input type="number" placeholder="Min" />
              <Input type="number" placeholder="Max" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterSidebar;