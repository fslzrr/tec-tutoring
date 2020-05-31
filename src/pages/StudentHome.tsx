import React, { useState } from "react"
import { createSession } from "../helpers/sessions"
import { useCurrentUser } from "../helpers/users"
import { Student } from "../models/User"
import { useForm } from "react-hook-form"


const StudentHome = () => {
  const { register } = useForm()
  const [materia, setMateria] = useState('ciencias');
  const user = useCurrentUser<Student>()

  const onCreateSessionClicked = () => {
    createSession(materia, user!!.uid)
      .then(() => {
      })
  }

  return (
    <div>
      <label>
        Materia:
          <input
          name="area"
          placeholder="materia"
          value={materia}
          onChange={event => setMateria(event.target.value)}
          ref={register({ required: true })} />
      </label>
      <div>
        <button
          disabled={!materia}
          onClick={onCreateSessionClicked}>Empezar Nueva Asesoria</button>
      </div>
    </div>

  );
};


export default StudentHome