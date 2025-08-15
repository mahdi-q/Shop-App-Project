import { Controller } from "react-hook-form";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import "@/styles/tag-input-override.css";

function RHFTagInput({
  label,
  name,
  control,
  errors,
  isRequired,
  className = "",
}) {
  const inputError = errors?.[name];
  const hasError = !!(errors && inputError);

  return (
    <div className={`textField relative ${className} `}>
      <label htmlFor={name} className="block text-secondary-700">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className={hasError ? "textField--invalid rounded-xl" : ""}>
            <ReactTagInput
              tags={field.value || []}
              onChange={(newTags) => field.onChange(newTags)}
              placeholder="برچسب‌ها را وارد کنید و Enter بزنید"
              removeOnBackspace={true}
            />
          </div>
        )}
      />

      {hasError && (
        <span className="block text-xs text-red-600">
          {inputError?.message}
        </span>
      )}
    </div>
  );
}

export default RHFTagInput;
