"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type ProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export default function Provider({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
