import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import GlobalStyles from "./global";
import SafeProvider from "./contexts/SafeContext";

ReactDOM.render(
  <>
    <SafeProvider>
      <GlobalStyles />
      <App />
    </SafeProvider>
  </>,
  document.getElementById("root"),
);
