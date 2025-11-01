export const metadata = {
  title: "ورود",
  description: "صفحه ورود به اپلیکیشن فروشگاهی",
};

function AuthLayout({ children }) {
  return (
    <div className="mx-auto mt-36 flex w-full items-center justify-center">
      {children}
    </div>
  );
}
export default AuthLayout;
