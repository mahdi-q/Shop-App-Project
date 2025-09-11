export const metadata = {
  title: "تکمیل اطلاعات",
  description: "صفحه تکمیل اطلاعات اپلیکیشن فروشگاهی",
};

function CompleteProfileLayout({ children }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {children}
    </div>
  );
}
export default CompleteProfileLayout;
