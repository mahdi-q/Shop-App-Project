import vazirFont from "@/constants/localFont";
import AppProviders from "@/providers/AppProviders";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: {
    template: "%s | اپلیکیشن فروشگاهی",
    default: "اپلیکیشن فروشگاهی",
  },
  description: "یک اپلیکیشن برای خرید هر چیزی",
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

          <div>{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
