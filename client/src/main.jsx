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
    clientId="2eeae8e874f0c66c7fa1ead710d316ee" // You can get a client id from dashboard settings
  >
    <Router>
      <StateContextProvider>
        <App />
        <Footer />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
