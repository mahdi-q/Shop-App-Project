"use client";

import Select from "react-select";
import { Controller } from "react-hook-form";

import "@/styles/select-input-override.css";

const RHFSelect = ({
  label,
  name,
  control,
  placeholder,
  isRequired,
  options,
  className = "",
  isMulti = false,
}) => {
  return (
    <div className={`textField relative ${className}`}>
      <label htmlFor={name} className="block text-secondary-700">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div
              className={
                fieldState.error ? "textField--invalid rounded-xl" : ""
              }
            >
              <Select
                {...field}
                options={options}
                placeholder={placeholder}
                isMulti={isMulti}
                classNamePrefix="custom-select"
                onChange={(val) => field.onChange(val)}
                value={field.value}
                unstyled
              />
            </div>

            {fieldState.error && (
              <span className="text-xs text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default RHFSelect;
