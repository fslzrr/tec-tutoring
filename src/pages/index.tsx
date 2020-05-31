import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useCurrentUser } from "../helpers/users";
import ActiveSession from "./ActiveSession";
import Login from "./Login";
import ProfessorHome from "./ProfessorHome";
import Signup from "./Signup";
import StudentHome from "./StudentHome";

export function MainRouter() {
  const currentUser = useCurrentUser()

  return (
    <BrowserRouter>
      <Switch>
        {!currentUser && <>
          <Route path="/login" component={Login} />}
          <Route path="/signup" component={Signup} />
          <Redirect to="/signup" />
        </>}
        {currentUser && <>
          {currentUser.type === "professor" && <Route path="/home" component={ProfessorHome} /> }
          {currentUser.type === "student" && <Route path="/home" component={StudentHome} />}
          <Route path="/active-session" component={ActiveSession} />
          <Redirect to="/home" />
        </>}
      </Switch>
    </BrowserRouter>
  )
}