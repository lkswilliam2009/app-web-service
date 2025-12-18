import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "../src/css/globals.css";
import App from "./App";
import Spinner from "./views/spinner/Spinner";
import { AuthProvider } from "./context/AuthContext/AuthContext";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Spinner />}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Suspense>
);