import React from "react";
import styles from "./App.module.scss";
import { MainRouter } from "./pages";
import preset from '@rebass/preset'
import { ThemeProvider } from 'emotion-theming'

const App = () => {
  return (
      <div>
        <ThemeProvider theme={preset}>
            <MainRouter />
          </ThemeProvider>
      </div>
  );
};

export default App;
