"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

// export function DateRangePicker({ date, setDate }) {
const DateRangePicker = ({ date, setDate }) => {
    return (
        <div className="grid gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={`w-[260px] justify-center text-left font-normal ${!date && "text-muted-foreground"}`}
                    >
                        <CalendarIcon 
                            className="mr-2 h-4 w-4"
                        />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <p>Pilih rentang tanggal</p>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2} // langsung tampil 2 kalender
                    />
                    <Button
                        onClick={() => setDate(undefined)}
                        className="w-full rounded-t-none rounded-b-md font-semibold"
                    >
                        Clear
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default DateRangePicker;