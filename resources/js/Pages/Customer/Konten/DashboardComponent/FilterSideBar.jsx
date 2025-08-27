import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import RentalDateRange from "./RentalDateRange";
import { se } from "date-fns/locale";

const FilterSidebar = ({ brands, models, types, transmissions, seats, fuels, cities, setFilters }) => {
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedSeats, setSelectedSeats] = useState("");
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);

  const handleClear = () => {
    setFilters({});
    setSelectedBrand("");
    setSelectedLocation("");
    setSelectedTransmission("");
    setSelectedFuel("");
    setSelectedSeats("");
  };
  
  return (
    <>
      <div className="flex flex-col gap-6 h-auto">
        <RentalDateRange
          onChange={(val) => setFilters(f => ({ ...f, ...val }))}
        />
        <div className="w-64 p-4 bg-white rounded-xl shadow-sm border h-auto">

          {/* Brand */}
          <div className="mb-4">
            <Label className="text-base font-semibold">Brand</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {brands.map((brand) => (
                <Button
                  key={brand}
                  variant={selectedBrand === brand ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => { 
                    setSelectedBrand(brand);
                    setFilters(f => ({ ...f, brand }))
                  }}
                >
                  {brand}
                </Button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mb-4">
            <Label className="text-base font-semibold">Location</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {cities.map((loc) => (
                <Button
                  key={loc}
                  variant={selectedLocation === loc ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setSelectedLocation(loc);
                    setFilters(f => ({ ...f, city: loc }));
                  }}
                >
                  {loc}
                </Button>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div className="mb-4">
            <Label className="text-base font-semibold">Transmission</Label>
            <RadioGroup 
              value={selectedTransmission}
              onValueChange={(val) => { 
                setSelectedTransmission(val);
                setFilters(f => ({ ...f, transmission: val }));
              }}
              className="mt-2">
              {transmissions.map((trans) => (
                <div className="flex items-center space-x-2" key={trans}>
                  <RadioGroupItem value={trans} id={trans} />
                  <Label htmlFor={trans}>{trans.charAt(0).toUpperCase() + trans.slice(1)}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Seats */}
          <div className="mb-4">
            <Label className="text-base font-semibold">Seat</Label>
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedSeats
                    ? seats.find((item) => item.value === selectedSeats)?.label
                    : "Select seat..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search seat..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No seat found.</CommandEmpty>
                    <CommandGroup>
                      {seats.map((item) => (
                        <CommandItem
                          key={item.value}
                          value={item.value}
                          onSelect={(currentValue) => {
                            const newValue = currentValue === selectedSeats ? "" : currentValue;
                            setSelectedSeats(newValue);
                            setComboboxOpen(false);
                            setFilters((f) => ({
                              ...f,
                              seats: newValue ? Number(newValue) : null,
                            }));
                          }}
                        >
                          {item.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedSeats === item.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Fuel */}
          <div className="mb-4">
            <Label className="text-base font-semibold">Fuel</Label>
            <RadioGroup 
              value={selectedFuel}
              onValueChange={(val) => {
                setSelectedFuel(val); 
                setFilters((f) => ({ ...f, fuel: val }));
              }}
            >
              {fuels.map((fuel) => (
                <div className="flex items-center space-x-2" key={fuel}>
                  <RadioGroupItem value={fuel} id={fuel} />
                  <Label htmlFor={fuel}>{fuel.charAt(0).toUpperCase() + fuel.slice(1)}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Available */}
          <div className="mb-4 flex items-center justify-between">
            <Label className="text-base font-semibold">Available Now Only</Label>
            <Switch 
              checked={availableOnly}
              onCheckedChange={(val) => { 
                setAvailableOnly(val);
                setFilters(f => ({ ...f, available: val }));
              }}
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <Label className="text-base font-semibold">Price</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="text"
                placeholder="Min"
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  const formatted = raw
                    ? "Rp " + raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : "";
                  e.target.value = formatted;
                  setFilters(f => ({
                    ...f,
                    min_price: raw ? Number(raw) : undefined,
                  }));
                }}
              />
              <Input
                type="text"
                placeholder="Max"
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  const formatted = raw
                    ? "Rp " + raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : "";
                  e.target.value = formatted;
                  setFilters(f => ({
                    ...f,
                    max_price: raw ? Number(raw) : undefined,
                  }));
                }}
              />
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-6 flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClear}
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;