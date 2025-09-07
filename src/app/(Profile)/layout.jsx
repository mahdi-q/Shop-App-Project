import ProfileHeader from "./_components/ProfileHeader";
import ProfileSidebar from "./_components/ProfileSidebar";

export const metadata = {
  title: "پروفایل",
  description: "صفحه پروفایل کاربر اپلیکیشن فروشگاهی",
};

function ProfileLayout({ children }) {
  return (
    <div className="bg-background grid h-screen grid-cols-12">
      {/* Sidebar */}
      <aside className="col-span-12 hidden overflow-y-auto px-3 py-4 lg:col-span-3 lg:block xl:col-span-2">
        <ProfileSidebar />
      </aside>

      {/* Body */}
      <div className="col-span-12 flex flex-col overflow-y-auto lg:col-span-9 xl:col-span-10">
        {/* Header */}
        <header className="sticky top-0 z-20 mx-1.5 rounded-b-md bg-primary-800/50 px-4 py-3 backdrop-blur-md lg:mx-2 lg:rounded-b-xl">
          <ProfileHeader />
        </header>

        {/* Content */}
        <main className="m-1.5 flex-1 rounded-md bg-secondary-100/70 p-4 md:p-6 lg:m-2 lg:rounded-xl lg:p-8">
          <div className="xl:max-w-screen-xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
export default ProfileLayout;
