"use client";

import { Controller } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function RHFDatePicker({
  control,
  name,
  label,
  placeholder,
  className = "",
  isRequired,
}) {
  return (
    <div className={`textField relative ${className}`}>
      <label htmlFor={name} className="block text-secondary-700">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState }) => (
          <>
            <DatePicker
              value={value ? new DateObject(value) : ""}
              onChange={(date) => onChange(date?.toDate?.() ?? null)}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-center"
              inputClass={`textField__input ${fieldState.error ? "textField--invalid" : ""} placeholder:text-secondary-600`}
              containerClass="w-full"
              placeholder={placeholder}
            />

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
}
