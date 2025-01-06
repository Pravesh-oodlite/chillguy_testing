import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <Toaster />
      </QueryClientProvider>
    </>
  );
};

export default App;
