import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { calculateDuration } from "./Handle/DurationHendle";

const DateTime = ({ startDate, setStartDate, endDate, setEndDate }) => {
  
  const formatDateTime = (date) => {
    if (!date) return "Date & Time";
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // helper to get HH:MM for input value
  const timeValue = (date) =>
    date ? date.toTimeString().substring(0, 5) : "";

  // jika date null, buat new Date() agar time bisa di-set dulu
  const handleTimeChange = (currentDate, setDate) => (e) => {
    const val = e.target.value; // "HH:MM"
    if (!val) return;
    const [h, m] = val.split(":").map((v) => parseInt(v, 10));
    const newDate = currentDate ? new Date(currentDate) : new Date();
    newDate.setHours(h, m, 0, 0);
    setDate(newDate);
  };

  const duration = calculateDuration(startDate, endDate);

  return (
    <>
      <Card>
         <CardContent className="flex flex-row justify-center items-center gap-20 p-6">
          {/* <div className="flex flex-col gap-2"> */}
            <div className="flex flex-col justify-center items-center">
              <Label>Rental Start Date & Time</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-center font-normal text-sm w-auto rounded-full">
                    <CalendarIcon /> {formatDateTime(startDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  <input
                    type="time"
                    className="mt-2 w-full border rounded p-1 text-sm"
                    value={timeValue(startDate)}
                    onChange={handleTimeChange(startDate, setStartDate)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col justify-center items-center">
              <Label className="text-[12px]">Durasi</Label>
              <div className="m-0 p-0 border rounded-full text-[12px] w-auto text-center py-1 px-3">
                {duration ? duration.text : "00"}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <Label>Rental End Date & Time</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-center font-normal text-sm w-auto rounded-full">
                    <CalendarIcon /> {formatDateTime(endDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  <input
                    type="time"
                    className="mt-2 w-full border rounded p-1 text-sm"
                    value={timeValue(endDate)}
                    onChange={handleTimeChange(endDate, setEndDate)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          {/* </div> */}
        </CardContent>
      </Card>
    </>
  );
};

export default DateTime;