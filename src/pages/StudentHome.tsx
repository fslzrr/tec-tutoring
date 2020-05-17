import React from "react"
import { PageKey, PageType } from "."
import Button from "../core/Button"
import { createSession } from "../helpers/sessions"
import { useCurrentUser } from "../helpers/users"
import { Student } from "../models/User"


const StudentHome: React.FunctionComponent<PageType> = (props) => {
  const user = useCurrentUser<Student>()

  const onCreateSessionClicked = () => {
    createSession("ciencias", user!!.uid)
      .then(() => {
        props.to(PageKey.ActiveSession)
      })
  }

  return (
    <div>
      <Button onClick={onCreateSessionClicked}>Empezar Nueva Asesoria</Button>
    </div>
  );
};

export default StudentHome