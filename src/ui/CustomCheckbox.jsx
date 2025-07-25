"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export const CustomCheckbox = ({ id, name, value, label, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const onChangeHandler = (e) => {
    setIsChecked(e.target.checked);

    onChange();
  };

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
        checked={isChecked}
        onChange={(e) => onChangeHandler(e)}
        className="peer hidden"
      />

      <div
        className={`relative flex h-5 w-5 items-center justify-center rounded border transition-colors ${isChecked ? "border-primary-900 bg-primary-900" : "border-secondary-300 bg-secondary-50"}`}
      >
        {isChecked && <FaCheck className="text-xs text-white" />}
      </div>

      <span className="text-base font-medium text-secondary-900">{label}</span>
    </label>
  );
};
