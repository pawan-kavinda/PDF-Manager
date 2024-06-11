import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./contexts/AuthContext";
import PdfContextProvider from "./contexts/PdfContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PdfContextProvider>
        <App />
      </PdfContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
