function Loader() {
  return (
    <div className="flex w-full items-center justify-center">
      <span className="ml-2 text-primary-900">در حال بارگذاری</span>
      <PulseLoader color="rgb(var(--color-primary-900))" size={12} margin={3} />
    </div>
  );
}
export default Loader;
