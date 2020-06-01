import { Input, Label } from "@rebass/forms"
import React, { useState } from "react"
import moment from 'moment'
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useForm } from "react-hook-form"
import { Button, Card, Flex, Text } from "rebass"
import { SessionCollection } from "../data/collections"
import { createSession, cancelSession } from "../helpers/sessions"
import { useCurrentUser } from "../helpers/users"
import { Session } from "../models/Session"
import { Student } from "../models/User"
import { firestore } from "firebase"


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

const now = new Date()
function getActiveSessionsOfCurrentUser(studentId: string) {
  return SessionCollection.where('endDate', '>', now)
    .where('student', '==', studentId)
    .orderBy("endDate")
}

function formatDateRange(t1: firestore.Timestamp, t2: firestore.Timestamp, ) {
  const m1 = moment(t1.toDate())
  const m2 = moment(t2.toDate())
  return `${m1.format('hh:mm A')} - ${m2.format('hh:mm A')}`
}

const StudentHome = () => {
  const { register } = useForm()
  const user = useCurrentUser<Student>()
  const [materia, setMateria] = useState('ciencias')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [session] = useCollectionData<Session>(getActiveSessionsOfCurrentUser(user?.uid || ''), { idField: 'id'})

  const onCreateSessionClicked = () => {
    setShowConfirmationModal(true)
    createSession(materia, user!!)
      .then(() => { })
  }

  return (
    <Card
      mx="auto"
      maxWidth={600}
      mt={5}>
      {showConfirmationModal && <SuccessModal onButtonClicked={() => setShowConfirmationModal(false)} />}
      <Flex
        flexDirection="column"
        bg=""
        p={2}>

        {session?.length === 0 && <>
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
        </>}

        {session?.length !== 0 && <>
          {session && !session[0].pending && <>
            <Text fontSize={5} mb={4}>Asesoria en curso</Text>
            <Text fontSize={4}>Area:</Text>
            <Text>{session[0].area}</Text>
            <Text mt={3} fontSize={4}>Ubicación:</Text>
            <Text>{session[0].location}</Text>
            <Text mt={3} fontSize={4}>Nombre del profesor:</Text>
            <Text>{session[0].professorName}</Text>
          </>}
          {session && session[0].pending && <>
            <Text fontSize={5} mb={4}>Asesoria en espera de un profesor</Text>
            <Text fontSize={4}>Area:</Text>
            <Text>{session[0].area}</Text>
            <Text mt={3} fontSize={4}>Ubicación:</Text>
            <Text>{session[0].location}</Text>
            <Text mt={3} fontSize={4}>Horario:</Text>
            <Text>{formatDateRange(session[0].startDate, session[0].endDate)}</Text>
            <Button bg="red" mt={3} onClick={() => cancelSession(session[0].id)}>Cancelar asesoria</Button>
          </>}
        </>}
      </Flex>
    </Card>
  );
};


export default StudentHome