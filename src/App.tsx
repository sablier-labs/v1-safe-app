import { HashRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import HomePage from "./pages/HomePage";
import IncomingStreamsPage from "./pages/IncomingStreamsPage";
import OutgoingStreamsPage from "./pages/OutgoingStreamsPage";
import theme from "./theme";

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/incoming" element={<IncomingStreamsPage />} />
          <Route path="/outgoing" element={<OutgoingStreamsPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
