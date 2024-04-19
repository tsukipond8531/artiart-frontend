import React from "react";

interface InputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, label }): JSX.Element => {
  return (
      <div className="relative">
        <input
          type={type}
          name={name}
          id="hs-floating-input-email"
          className="peer p-4 block w-full border-2  border-gray-200  text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
            focus:pt-6
            focus:pb-2
            [&:not(:placeholder-shown)]:pt-6
            [&:not(:placeholder-shown)]:pb-2
            autofill:pt-6
            autofill:pb-2"
          placeholder={placeholder}
        />
        <label
          htmlFor="hs-floating-input-email"
          className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:scale-90
            peer-focus:translate-x-0.5
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500
            peer-[:not(:placeholder-shown)]:scale-90
            peer-[:not(:placeholder-shown)]:translate-x-0.5
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500"
        >
          {label}
        </label>
      </div>
  );
};

export default Input;
