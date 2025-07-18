const btnType = {
  primary:
    "bg-primary-100 text-primary-700 hover:bg-primary-900 hover:text-primary-100",

  secondary:
    "bg-secondary-200 text-secondary-500 hover:bg-secondary-500 hover:text-secondary-50",

  outline:
    "border border-secondary-200 text-secondary-500 hover:bg-secondary-200",

  danger: "bg-transparent text-error hover:bg-error/20",

  text: "text-secondary-700 hover:text-secondary-900",
};

function ButtonIcon({ children, onClick, className, varient, ...rest }) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${btnType[varient]} flex items-center justify-center gap-x-1 rounded p-1 text-xs transition-all duration-300 ease-out lg:text-sm [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-inherit lg:[&>svg]:h-5 lg:[&>svg]:w-5`}
      {...rest}
    >
      {children}
    </button>
  );
}
export default ButtonIcon;
