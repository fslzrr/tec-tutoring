import React from "react"
import Login from "./Login";
import Signup from "./Signup";
import ProfessorHome from "./ProfessorHome";
import StudentHome from "./StudentHome";
import ActiveSession from "./ActiveSession";

export enum PageKey {
  Login = 'Login',
  Signup = 'Signup',
  ProfessorHome = 'ProfessorHome',
  StudentHome = 'StudentHome',
  ActiveSession = 'ActiveSession'
}

export type PageType = {
  to: (page: PageKey, title?: string) => void;
  toggleTheme: () => void;
};

export const Pages: { [k in PageKey]: React.ElementType<PageType> } = {
  Login,
  Signup,
  ProfessorHome: ProfessorHome,
  StudentHome: StudentHome,
  ActiveSession: ActiveSession
};

export const PageTitles: { [key in PageKey]: string } = {
  Login: "Welcome to Tec Tutoring",
  Signup: "Create a new account",
  ProfessorHome: "ProfessorHome",
  StudentHome: "StudentHome",
  ActiveSession: "ActiveSession",
};