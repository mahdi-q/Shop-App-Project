import AdminPanelHeader from "./_components/AdminPanelHeader";
import AdminPanelSidebar from "./_components/AdminPanelSidebar";

export const metadata = {
  title: "پنل ادمین",
  description: "صفحه پنل ادمین اپلیکیشن فروشگاهی",
};

function AdminPanelLayout({ children }) {
  return (
    <div className="grid h-screen grid-cols-12 bg-white">
      {/* Sidebar */}
      <aside className="col-span-12 hidden overflow-y-auto px-3 py-4 lg:col-span-3 lg:block xl:col-span-2">
        <AdminPanelSidebar />
      </aside>

      {/* Body */}
      <div className="col-span-12 flex flex-col overflow-y-auto lg:col-span-9 xl:col-span-10">
        {/* Header */}
        <header className="sticky top-0 z-20 mx-1.5 rounded-b-md bg-primary-400 p-4 lg:mx-2 lg:rounded-b-xl">
          <AdminPanelHeader />
        </header>

        {/* Content */}
        <main className="m-1.5 flex-1 rounded-md bg-secondary-50/70 p-4 md:p-6 lg:m-2 lg:rounded-xl lg:p-8">
          <div className="xl:max-w-screen-xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
export default AdminPanelLayout;
