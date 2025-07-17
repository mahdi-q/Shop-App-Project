import Header from "@/components/Header";

function UserLayout({ children }) {
  return (
    <div>
      <Header />

      <div className="container xl:max-w-screen-xl">{children}</div>
    </div>
  );
}
export default UserLayout;
