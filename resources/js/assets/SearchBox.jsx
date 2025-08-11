import { Input } from "@/Components/ui/input";
import { Search } from "lucide-react";

export function SearchBox({ value, onChange, placeholder = "Search" }) {
  return (
    <div className="flex items-center w-full max-w-lg border border-gray-300 rounded-full overflow-hidden">
      {/* Icon */}
      <div className="flex items-center justify-center px-3 bg-white text-blue-600">
        <Search size={16} />
      </div>
      {/* Input */}
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
}
