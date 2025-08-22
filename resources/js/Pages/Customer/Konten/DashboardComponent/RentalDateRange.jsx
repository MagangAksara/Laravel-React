import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"

const RentalDateRange = ({ startDate: initialStart = null, endDate: initialEnd = null, onChange }) => {
  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);

  const formatDateTime = (date) => {
    if (!date) return "Date & Time"
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  // when local dates change, emit ISO strings (or null) to parent
  useEffect(() => {
    if (typeof onChange === "function") {
      onChange({
        start_date: startDate ? startDate.toISOString() : null,
        end_date: endDate ? endDate.toISOString() : null,
      });
    }
  }, [startDate, endDate, onChange]);

  const handleTimeChange = (date, setDate) => (e) => {
    if (date) {
      const [h, m] = e.target.value.split(":")
      const newDate = new Date(date)
      newDate.setHours(h, m)
      setDate(newDate)
    }
  }

  return (
    <div className="w-64 p-4 bg-white rounded-xl shadow-sm border">
      <h2 className="font-semibold mb-4">Available From</h2>
      <div className="grid grid-cols-2 gap-2">
        {/* Rental Start */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Rental Start</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-center text-left font-normal text-xs truncate p-0 m-0"
              >
                <CalendarIcon />
                {formatDateTime(startDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
              <input
                type="time"
                className="mt-2 w-full border rounded p-1 text-sm"
                onChange={handleTimeChange(startDate, setStartDate)}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Rental End */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Rental End</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-center text-left font-normal text-xs truncate p-0 m-0"
              >
                <CalendarIcon />
                {formatDateTime(endDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
              <input
                type="time"
                className="mt-2 w-full border rounded p-1 text-sm"
                onChange={handleTimeChange(endDate, setEndDate)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default RentalDateRange;