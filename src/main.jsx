import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WalletProviderContext } from "./context/walletConnectContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WalletProviderContext>
      <App />
    </WalletProviderContext>
  </StrictMode>
);
