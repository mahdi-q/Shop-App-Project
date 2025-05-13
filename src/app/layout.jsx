import vazirFont from "@/constants/localFont";
import "@/styles/globals.css";

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
        {children}
      </body>
    </html>
  );
}
