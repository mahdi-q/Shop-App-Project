"use client";

import { FaCheck } from "react-icons/fa";

export const CustomCheckbox = ({ id, name, value, label, checked, onChange }) => {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer select-none items-center gap-2"
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />

      <div
        className={`relative flex h-5 w-5 items-center justify-center rounded border transition-colors ${checked ? "border-primary-900 bg-primary-900" : "border-secondary-300 bg-secondary-50"}`}
      >
        {checked && <FaCheck className="text-xs text-white" />}
      </div>

      <span className="text-base font-medium text-secondary-900">{label}</span>
    </label>
  );
};
