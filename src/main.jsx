import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Error from "./error";
import { ContextProvider } from "./context/ContextProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  
        <ContextProvider>
          <QueryClientProvider client={queryClient}>
            
              <App />
           
          </QueryClientProvider>
        </ContextProvider>
  
  </React.StrictMode>
);

// https://analytics.google.com/analytics/web/#/p416965870/reports/intelligenthome?params=_u..nav%3Dmaui
