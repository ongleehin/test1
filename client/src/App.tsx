import { Routes, Route } from "react-router-dom";
import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import React from "react";
// import { ReactQueryDevtools } from "react-query/devtools";
import ShortenURL from "./pages/ShortenURL";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<ShortenURL />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
    // <ReactQueryDevtools />
  );
}

export default App;
