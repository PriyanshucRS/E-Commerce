import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  id : string,
  label: string,
  placeholder: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  required?: boolean,
  

}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  required = true,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          className="w-full px-4 py-2 border
           border-gray-300 rounded-lg focus:ring-2
            focus:ring-blue-500 focus:border-transparent outline-none transition"
          required={required}
          onChange={onChange}
        />
        <button
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2  -translate-y-1/2 text-gray-400 hover:text-blue-600"
          type="button"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};
