import { firestore } from "firebase"
import moment from 'moment'
import React from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Box, Card, Text } from "rebass"
import { SessionCollection } from "../data/collections"
import { useCurrentUser } from "../helpers/users"
import { Session } from "../models/Session"
import { Professor } from "../models/User"

const now = new Date()
function getSessionHistory(professorId: string) {
  return SessionCollection.where('endDate', '<', now)
    .where('professor', '==', professorId)
    .orderBy("endDate")
}

function formatDateRange(t1: firestore.Timestamp, t2: firestore.Timestamp, ) {
  const m1 = moment(t1.toDate())
  const m2 = moment(t2.toDate())
  return `${m1.format('LLLL')} - ${m2.format('hh:mm A')}`
}

const ProfessorHistory = () => {
  const user = useCurrentUser<Professor>()
  const [session] = useCollectionData<Session>(getSessionHistory(user?.uid || ''), { idField: 'id' })

  return (
    <Box
      mx="auto"
      maxWidth={600}
      mt={5}>
      <Text fontSize={5} mb={4}>Historial</Text>

        {session?.map(x =>
        <Card
        mx="auto"
        maxWidth={600}
        mt={5}>
            <Text fontSize={2}>Area: {x.area}</Text>
            <Text mt={3} >Ubicación: {x.location}</Text>
            <Text mt={3}>Nombre del alumno: {x.studentName}</Text>
            <Text mt={3}>Horario:{formatDateRange(x.startDate, x.endDate)}</Text>
          </Card>
        )}
    </Box>
  );
};


export default ProfessorHistory