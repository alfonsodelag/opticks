import React from "react";
import { createRoot } from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import store from "@/redux";
//
import App from "@/components/App";
import "./css/global.css";

const GlobalStyles = createGlobalStyle`
    p, div, h1, h2, h3, h4, h5, h6,
    span, pre, article, section, aside,
    main, footer, header, nav, html, body,
    #root, button {
        padding: 0;
        margin: 0;
        border: none;
        background: none;
    }

    html, body, #root {
        position: relative;
        height: 100%;
        width: 100%;
        font-family: 'Roboto', sans-serif;
        display: flex;
        flex-direction: column;
    }
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00447F",
    },
    secondary: {
      main: "#00447F",
    },
  },
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
        <GlobalStyles />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>
);
