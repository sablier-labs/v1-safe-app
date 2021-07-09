import SafeProvider from "@gnosis.pm/safe-apps-react-sdk";
import ReactDOM from "react-dom";

import App from "./App";
import StreamsProvider from "./contexts/StreamsContext";
import GlobalStyles from "./theme/global";

ReactDOM.render(
  <SafeProvider>
    <StreamsProvider>
      <GlobalStyles />
      <App />
    </StreamsProvider>
  </SafeProvider>,
  document.getElementById("root"),
);
