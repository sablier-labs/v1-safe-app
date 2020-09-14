import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyles from "./theme/global";
import SafeProvider from "./contexts/SafeContext";
import StreamsProvider from "./contexts/StreamsContext";

ReactDOM.render(
  <SafeProvider>
    <StreamsProvider>
      <GlobalStyles />
      <App />
    </StreamsProvider>
  </SafeProvider>,
  document.getElementById("root"),
);
