export const metadata = {
  title: "ورود",
  description: "صفحه ورود به اپلیکیشن فروشگاهی",
};

function AuthLayout({ children }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {children}
    </div>
  );
}
export default AuthLayout;
