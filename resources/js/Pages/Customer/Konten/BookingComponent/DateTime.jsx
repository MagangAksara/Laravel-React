import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { CalendarIcon, ChevronsRight } from "lucide-react";
import { calculateDuration } from "./Handle/DurationHendle";

const DateTime = ({ startDate, setStartDate, endDate, setEndDate, blockedRange }) => {

  // set default start & end kalau masih kosong
  useEffect(() => {
    if (!startDate) {
      const now = new Date();
      setStartDate(now);

      if (!endDate) {
        const plus24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        setEndDate(plus24h);
      }
    }
  }, [startDate, endDate, setStartDate, setEndDate]);

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

  const isBlockedDate = (date) => {
    if (!blockedRange) return false;
    const rangeStart = new Date(blockedRange.start);
    const rangeEnd = new Date(blockedRange.end);
    return date >= rangeStart && date <= rangeEnd;
  };

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
                <Calendar 
                  mode="single" 
                  selected={startDate} 
                  onSelect={setStartDate} 
                  initialFocus 
                  disabled={(date) => isBlockedDate(date) || date < new Date()}
                />
                <input
                  type="time"
                  className="mt-2 w-full border rounded p-1 text-sm"
                  value={timeValue(startDate)}
                  onChange={handleTimeChange(startDate, setStartDate)}
                />
              </PopoverContent>
            </Popover>
          </div>

          <ChevronsRight />

          <div className="flex flex-col justify-center items-center">
            <Label>Rental End Date & Time</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-center font-normal text-sm w-auto rounded-full">
                  <CalendarIcon /> {formatDateTime(endDate)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <Calendar 
                  mode="single" 
                  selected={endDate} 
                  onSelect={setEndDate} 
                  initialFocus 
                  disabled={(date) => isBlockedDate(date) || date < new Date() || (endDate && date < endDate)}
                />
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