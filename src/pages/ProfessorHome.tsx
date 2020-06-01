import React, { useState, useEffect } from "react"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { SessionCollection } from "../data/collections"
import { useCurrentUser, saveLocation } from "../helpers/users"
import { Professor } from "../models/User"
import { Session } from "../models/Session"
import { startSession } from "../helpers/sessions"
import { Select, Input } from "@rebass/forms"
import { Button, Card, Text, Box, Flex } from "rebass"
import { useForm } from "react-hook-form"

function getActiveSessionsOfCurrentUser(professorId: string) {
  return SessionCollection.where('professor', '==', professorId)
}

function getPendingSessions() {
  return SessionCollection.where('pending', '==', true)
}

function getUniqueAreasFromSessions(sessions: Session[] | undefined) {
  return sessions ? Array.from(new Set(sessions.map(s => s.area))).sort() : ['']
}

const SuccessModal = (props: { onSubmit: (location: string) => any }) => {
  const { register, handleSubmit } = useForm()
  return (
    <Flex sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
      backgroundColor="#ffffffed"
      justifyContent="center"
      alignItems="center">
      <Card minWidth={350} p={4}>
        <Flex
          justifyContent="center"
          flexDirection="column"
          as="form"
          onSubmit={handleSubmit((values) => props.onSubmit(values["ubicacion"]))}>
          Donde sera la asesoria?
          <Input ref={register({ required: true })} name="ubicacion" />
          <Button mt={4}>Aceptar</Button>
        </Flex>
      </Card>
    </Flex>
  )
}

// TODO: Add active sessions on the right.
const ProfessorHome = () => {
  const user = useCurrentUser<Professor>()
  const [pendingSessions] = useCollectionData<Session>(getPendingSessions(), { idField: 'id' })
  const [activeSessions] = useCollectionData<Session>(
    getActiveSessionsOfCurrentUser(user?.uid || ''), { idField: 'id' })
  const areas: Array<string> = getUniqueAreasFromSessions(pendingSessions)
  const [area, setArea] = useState(areas[0] ? areas[0] : 'none')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [sessionToConfirm, setSessionToConfirm] = useState("")

  const saveLocation = (location: string) => {
    startSession(sessionToConfirm, user!!, location)
      .then(() => setShowConfirmModal(false))
  }

  const startSessionFlow = (sessionId: string) => {
    setSessionToConfirm(sessionId)
    setShowConfirmModal(true)
  }

  return (
    <div>
      {showConfirmModal && <SuccessModal onSubmit={saveLocation} />}
      <Card maxWidth={750} p={3} mx="auto" mt={5}>
        {activeSessions?.length === 0 && <>
          <Select
            id="dropdown"
            mb={4}
            value={area}
            onChange={event => setArea(event.target.value)}>
            <option key="none">None</option>
            {user && areas && areas.map(a => <option key={a}>{a}</option>)}
          </Select>
          {area !== "None" && <div> {/* Pending Sessions */}
            <Text fontSize={5} mb={3}>Grupos esperando profesor para {area}</Text>
            {user && pendingSessions && pendingSessions.map(s =>
              s.area === area &&
              <Flex key={s.id} justifyContent="space-between" mb={2}>
                <Text>{s.studentName}</Text>
                <Button onClick={() => startSessionFlow(s.id)}>Aceptar</Button>
              </Flex>
            )}
          </div>}
        </>}
        {activeSessions?.length !== 0 && <>
          {activeSessions && !activeSessions[0].pending && <>
            <Text fontSize={5} mb={4}>Asesoria en curso</Text>
            <Text fontSize={4}>Area:</Text>
            <Text>{activeSessions[0].area}</Text>
            <Text mt={3} fontSize={4}>Ubicación:</Text>
            <Text>{activeSessions[0].location}</Text>
            <Text mt={3} fontSize={4}>Nombre del alumno:</Text>
            <Text>{activeSessions[0].studentName}</Text>
          </>}
        </>}
      </Card>
    </div>
  );
};

export default ProfessorHome