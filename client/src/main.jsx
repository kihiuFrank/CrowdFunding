import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
// import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";

import { StateContextProvider } from "./context";
import App from "./App";
import "./index.css";
import { Footer } from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider
    activeChain={Sepolia}
    clientId="a5835e84284b5f112bc6d7cc7e75583f" // You can get a client id from dashboard settings
  >
    <Router>
      <StateContextProvider>
        <App />
        <Footer />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
