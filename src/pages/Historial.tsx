import { Input, Label } from "@rebass/forms"
import React, { useState } from "react"
import moment from 'moment'
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useForm } from "react-hook-form"
import { Button, Card, Flex, Text, Box } from "rebass"
import { SessionCollection } from "../data/collections"
import { createSession, cancelSession } from "../helpers/sessions"
import { useCurrentUser } from "../helpers/users"
import { Session, kSessionState } from "../models/Session"
import { Student } from "../models/User"
import { firestore } from "firebase"

const now = new Date()
function getSessionHistory(studentId: string) {
  return SessionCollection.where('endDate', '<', now)
    .where('student', '==', studentId)
    .orderBy("endDate")
}

SessionCollection.where('endDate', '<', now)
    .where('student', '==', "Adf")
    .orderBy("endDate").onSnapshot(() => {})

function formatDateRange(t1: firestore.Timestamp, t2: firestore.Timestamp, ) {
  const m1 = moment(t1.toDate())
  const m2 = moment(t2.toDate())
  return `${m1.format('LLLL')} - ${m2.format('hh:mm A')}`
}

const History = () => {
  const user = useCurrentUser<Student>()
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
            <Text mt={3}>Nombre del profesor: {x.professorName}</Text>
            <Text mt={3}>Horario:{formatDateRange(x.startDate, x.endDate)}</Text>
          </Card>
        )}
    </Box>
  );
};


export default History