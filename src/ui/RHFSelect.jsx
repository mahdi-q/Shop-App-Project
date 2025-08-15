function RHFSelect({
  label,
  name,
  dir = "rtl",
  register,
  errors,
  isRequired,
  validationSchema = {},
  className = "",
  options = [],
  ...rest
}) {
  const inputError = errors?.[name];
  const hasError = !!(errors && inputError);

  return (
    <div className={`textField relative ${className}`}>
      <label htmlFor={name} className="block text-secondary-700">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>

      <select
        id={name}
        dir={dir}
        className={`textField__input ${dir === "ltr" ? "text-left" : "text-right"} ${hasError ? "textField--invalid" : ""}`}
        {...register(name, validationSchema)}
        {...rest}
      >
        <option value="">یک گزینه انتخاب کنید</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hasError && (
        <span className="block text-xs text-red-600">
          {inputError?.message}
        </span>
      )}
    </div>
  );
}
export default RHFSelect;
