"use client";

import { FaCircle } from "react-icons/fa";

export const CustomRadio = ({ id, label, name, value, checked, onChange }) => {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer select-none items-center gap-2"
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />

      <div
        className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${checked ? "border-primary-900" : "border-secondary-300"}`}
      >
        {checked && <FaCircle className="text-[12px] text-primary-900" />}
      </div>

      <span className="text-base font-medium text-secondary-900">{label}</span>
    </label>
  );
};
