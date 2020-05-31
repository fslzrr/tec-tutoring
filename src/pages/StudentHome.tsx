import React, { useState } from "react"
import { createSession } from "../helpers/sessions"
import { useCurrentUser } from "../helpers/users"
import { Student } from "../models/User"
import { useForm } from "react-hook-form"
import { Button, Flex, Text, Card } from "rebass"
import { Label, Input } from "@rebass/forms"


const SuccessModal = (props: { onButtonClicked: () => any }) => (
  <Flex sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
    backgroundColor="#ffffffed"
    justifyContent="center"
    alignItems="center">
    <Card minWidth={350} p={4}>
      <Flex justifyContent="center" flexDirection="column">
        Se ha creado la asesoria exitosamente
        <Button onClick={props.onButtonClicked} mt={4}>Aceptar</Button>
      </Flex>
    </Card>
  </Flex>
)

const StudentHome = () => {
  const { register } = useForm()
  const [materia, setMateria] = useState('ciencias')
  const [showConfirmationModal, setShowConfirmationModal] = useState(true)

  const user = useCurrentUser<Student>()

  const onCreateSessionClicked = () => {
    createSession(materia, user!!.uid)
      .then(() => setShowConfirmationModal(true))
  }

  return (
    <div>
      {showConfirmationModal && <SuccessModal onButtonClicked={() => setShowConfirmationModal(false)} />}
      <Flex
          flexDirection="column"
          bg=""
          mx="auto"
          maxWidth={600}
          mt={5}
          p={2}>
        <Text fontSize={5} mb={4}>Iniciar nueva asesoria</Text>
        <Label mb={4}>Materia:</Label>
        <Input
          mb={4}
          name="area"
          placeholder="materia"
          value={materia}
          onChange={event => setMateria(event.target.value)}
          ref={register({ required: true })} />
          <Button
            alignSelf="baseline"
            disabled={!materia}
            onClick={onCreateSessionClicked}>
              Empezar Nueva Asesoria
          </Button>
      </Flex>
    </div>
  );
};


export default StudentHome