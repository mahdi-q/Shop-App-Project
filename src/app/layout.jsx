import Header from "@/components/Header";
import vazirFont from "@/constants/localFont";
import AppProviders from "@/providers/AppProviders";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Shop App Project",
  description: "An app for shopping anything",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        suppressHydrationWarning
        className={`${vazirFont.variable} font-sans`}
      >
        <AppProviders>
          <Toaster />

          <Header />

          <div className="container xl:max-w-screen-xl">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
