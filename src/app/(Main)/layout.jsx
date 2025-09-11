import Footer from "@/components/Footer";
import Header from "@/components/Header";

function MainLayout({ children }) {
  return (
    <div>
      <Header />

      <div className="container h-full xl:max-w-screen-xl">{children}</div>

      <Footer />
    </div>
  );
}
export default MainLayout;
