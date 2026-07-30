import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";
import "./index.css";

import { queryClient } from "@/config/queryClient";
import { AuthProvider } from "@/features/auth/context/AuthProvider";

import { Toaster } from "sonner";
import { setupInterceptors } from "@/api/setupInterceptors";

setupInterceptors();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />

      <Toaster
        richColors
        position="top-right"
        theme="dark"
      />
    </QueryClientProvider>
  </StrictMode>
);