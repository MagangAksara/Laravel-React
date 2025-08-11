import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export function FloatingLabelPassword({ id, label, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false)

  const hasValue = value && value.length > 0

  return (
    <div className="relative w-[80%] mx-auto mt-8 mb-8">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder=""
        autoComplete="off"
        className={`peer w-full border-0 border-b-2 border-gray-400 bg-transparent text-white placeholder-transparent focus:outline-none focus:border-blue-500`}
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

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-2.5 text-gray-400 hover:text-white"
      >
        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    </div>
  )
}
