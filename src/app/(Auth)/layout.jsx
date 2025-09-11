import Header from "@/components/Header";

function AuthLayout({ children }) {
  return (
    <div>
      <Header />

      <div className="container h-full xl:max-w-screen-xl">{children}</div>
    </div>
  );
}
export default AuthLayout;
