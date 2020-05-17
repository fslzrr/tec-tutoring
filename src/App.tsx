import React, { useState, useEffect } from "react";

import ThemeContext from "./theme/themeContext";
import styles from "./App.module.scss";
import Header from "./core/Header";

import { useCurrentUser } from "./helpers/users";
import { PageKey, PageTitles, Pages } from "./pages";

const themeClass = (
  styles: { readonly [key: string]: string },
  theme: string
) => `${styles[`theme-${theme}`]}`;

const App: React.FunctionComponent<{}> = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [page, setPage] = useState<PageKey>(PageKey.Login);
  const [title, setTitle] = useState("Welcome to Tec Tutoring");
  const currentUser = useCurrentUser()

  useEffect(() => {
    if (currentUser) {
      switch(currentUser.type) {
        case "professor":
          to(PageKey.ProfessorHome)
          break
        case "student":
          to(PageKey.StudentHome)
          break
      }
    } else if (currentUser === null) {
      to(PageKey.Login)
    }
  }, [currentUser])


  const to = (page: PageKey, title?: string) => {
    setPage(page);
    setTitle(title === undefined ? PageTitles[page] : title);
  };

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  const Page = Pages[page];

  return (
    <ThemeContext.Provider value={{ theme, themeClass }}>
      <div className={`${styles.App} ${themeClass(styles, theme)}`}>
        <Header title={title}></Header>
        <div className={styles.PageContainer}>
          <Page to={to} toggleTheme={toggleTheme}></Page>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
