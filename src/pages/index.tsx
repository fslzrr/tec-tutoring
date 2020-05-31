import React from "react";
import { BrowserRouter, Redirect, Route, Switch, Link } from 'react-router-dom';
import { useCurrentUser } from "../helpers/users";
import ActiveSession from "./ActiveSession";
import Login from "./Login";
import ProfessorHome from "./ProfessorHome";
import Signup from "./Signup";
import StudentHome from "./StudentHome";
import { Flex, Box, Text } from "rebass";

export function MainRouter() {
  const currentUser = useCurrentUser()

  return (
    <BrowserRouter>
      <Switch>
        {!currentUser && <>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Redirect to="/signup" />
        </>}
        {currentUser && <>
          <Flex
            px={2}
            color='white'
            bg='primary'
            alignItems='center'>
            <Text p={3} >Tec Tutoring</Text>
            <Box mx='auto' />
            <Box mr={2}><Link color="white" to="/home">
              <Text color="white" p={3} fontWeight='bold' sx={{textDecoration: 'none'}}>Inicio</Text></Link>
            </Box>
            <Box mr={2}><Link color="white" to="/profile"><Text color="white" p={3} fontWeight='bold' sx={{textDecoration: 'none'}}>
              Perfil</Text></Link>
            </Box>
          </Flex>
          {currentUser.type === "professor" && <Route path="/home" component={ProfessorHome} /> }
          {currentUser.type === "student" && <Route path="/home" component={StudentHome} />}
          <Route path="/active-session" component={ActiveSession} />
          <Redirect to="/home" />
        </>}
      </Switch>
    </BrowserRouter>
  )
}