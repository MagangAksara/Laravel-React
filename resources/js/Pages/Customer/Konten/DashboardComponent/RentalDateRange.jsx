import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"

const RentalDateRange = ({ startDate: initialStart = null, endDate: initialEnd = null, onChange }) => {
  const now = new Date()
  now.setSeconds(0, 0)

  const [startDate, setStartDate] = useState(initialStart ? new Date(initialStart) : now)
  const [endDate, setEndDate] = useState(initialEnd ? new Date(initialEnd) : null)

  const formatDateTime = (date) => {
    if (!date) return "Date & Time"
    const d = date
    const day = String(d.getDate()).padStart(2, "0")
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const year = String(d.getFullYear()).slice(-2)
    const hour = String(d.getHours()).padStart(2, "0")
    const minute = String(d.getMinutes()).padStart(2, "0")
    return `${day}/${month}/${year}, ${hour}:${minute}`
  }

  // when local dates change, emit ISO strings (or null) to parent
  useEffect(() => {
  if (typeof onChange === "function") {
    // hanya emit kalau ada start_date atau end_date
    if (startDate || endDate) {
      onChange({
        start_date: startDate ? startDate.toISOString() : null,
        end_date: endDate ? endDate.toISOString() : null,
      });
    }
  }
}, [startDate, endDate]);

  const handleTimeChange = (date, setDate) => (e) => {
    if (date) {
      const [h, m] = e.target.value.split(":")
      const newDate = new Date(date)
      newDate.setHours(h, m)

      // if (isEnd && startDate) {
      //   // pastikan endDate >= startDate + 2 jam
      //   const minEnd = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
      //   if (newDate < minEnd) {
      //     alert("End time must be at least 2 hours after start time.");
      //     return;
      //   }
      // }

      setDate(newDate)
    }
  }

  // Helper untuk time input value
  const formatTimeValue = (date) => (date ? date.toTimeString().slice(0, 5) : "")

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
                {!startDate ? <CalendarIcon /> : null}
                {formatDateTime(startDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <Calendar
                mode="single"
                selected={startDate}
                // onSelect={setStartDate}
                onSelect={(date) => {setStartDate(date)}}
                disabled={(date) => {
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  return date < today
                }}
                initialFocus
              />
              <input
                type="time"
                className="mt-2 w-full border rounded p-1 text-sm"
                // value={formatTimeValue(startDate)}
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
                {!endDate ? <CalendarIcon /> : null}
                {formatDateTime(endDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => {setEndDate(date)}}
                // onSelect={(date) => {
                //   if (date) {
                //     const newDate = new Date(date)
                //     // jika belum ada startDate, jam default 2 jam dari sekarang
                //     if (startDate) {
                //       newDate.setDate(startDate.getDate() + 1)
                //       newDate.setHours(startDate.getHours() + 2, startDate.getMinutes(), 0, 0)
                //     } else {
                //       newDate.setHours(now.getHours() + 2, now.getMinutes(), 0, 0)
                //     }
                //     setEndDate(newDate)
                //   }
                // }}
                disabled={(date) => {
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  return date < today || (startDate && date < startDate)
                }}
                initialFocus
              />
              <input
                type="time"
                className="mt-2 w-full border rounded p-1 text-sm"
                // value={formatTimeValue(endDate)}
                onChange={handleTimeChange(endDate, setEndDate, true)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default RentalDateRange;