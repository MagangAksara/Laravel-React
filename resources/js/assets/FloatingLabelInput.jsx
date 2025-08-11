import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function FloatingLabelInput({ id, label, type = "text", value, onChange }) {
  return (
    <div className="relative w-[80%] mx-auto mt-8 mb-8">
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=""
        className="peer w-full border-0 border-b-2 border-gray-400 bg-transparent text-white placeholder-transparent focus:outline-none focus:border-blue-500"
      />
      <Label
        htmlFor={id}
        className="absolute left-0 -top-3.5 text-sm text-gray-400 transition-all
          peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
          peer-placeholder-shown:top-2 
          peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-500"
      >
        {label}
      </Label>
    </div>
  )
}
