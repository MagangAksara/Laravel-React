import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "all",                        label: "All statuses" },
  { value: "pending_payment",            label: "Pending Payment" },
  { value: "confirmed_payment",          label: "Confirmed Payment" },
  { value: "payment_received",           label: "Payment Received" },
  { value: "on_rent",                    label: "On Rent" },
  { value: "waiting_for_check",          label: "Waiting for Check" },
  { value: "waiting_for_fines_payment",  label: "Waiting for Fines Payment" },
  { value: "completed",                  label: "Completed" },
  { value: "expired",                    label: "Expired" },
  { value: "cancelled",                  label: "Cancelled" },
  { value: "failed",                     label: "Failed" },
];

function StatusCombobox({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const selected = STATUS_OPTIONS.find(s => s.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full"
        >
          {selected ? `${selected.label}` : "Pilih status..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="end">
        <Command>
          {/* <CommandInput placeholder="Cari status..." /> */}
          <CommandList>
            <CommandEmpty>Tidak ada status</CommandEmpty>
            <CommandGroup heading="Status">
              {STATUS_OPTIONS.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <Check
                    className={`h-4 w-4 ${value === opt.value ? "opacity-100" : "opacity-0"}`}
                  />
                  <span>{opt.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default StatusCombobox;