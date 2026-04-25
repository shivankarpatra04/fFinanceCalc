import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { HelmetProvider } from "react-helmet-async";

// Add Google Analytics
if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);
  
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]){ window.dataLayer.push(args); }
  gtag('js', new Date());
  gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID);
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
