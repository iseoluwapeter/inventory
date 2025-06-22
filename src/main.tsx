import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { StaffProvider } from "./context/StaffContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StaffProvider>
      <App />
    </StaffProvider>
  </BrowserRouter>
);
