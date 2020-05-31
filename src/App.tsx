import React from "react";
import styles from "./App.module.scss";
import { MainRouter } from "./pages";

const App = () => {
  return (
      <div>
        <div className={styles.PageContainer}>
          <MainRouter />
        </div>
      </div>
  );
};

export default App;
