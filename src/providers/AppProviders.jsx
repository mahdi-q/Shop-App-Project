"use client";

import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function AppProviders({ children }) {
  const queryClient = new QueryClient();

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </DarkModeProvider>
  );
}
export default AppProviders;
