"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ThemeProviderProps } from "next-themes";
import { useState } from "react";

export function Providers({ children }: ThemeProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
