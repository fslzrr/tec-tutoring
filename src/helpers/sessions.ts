import { firestore } from 'firebase';
import moment from 'moment';
import { SessionCollection } from "../data/collections";
import { Session } from "../models/Session";
import { Professor, Student } from "../models/User";


function getNextDates() {
  const dates = moment(moment.now())
  const day = moment(`${dates.year()}/${dates.month()+1}/${dates.date()}`)
  const startDate = day.add('hours', dates.hour() + 1)

  return {
    startDate: startDate.toDate(),
    endDate: startDate.add('hour', 1).toDate() ,
  }
}

export function createSession(area: string, student: Student) {
  const { startDate, endDate } = getNextDates()

  return SessionCollection.add({
    area,
    student: student.uid,
    pending: true,
    location: "Por definir",
    studentName: student.displayName,
    startDate: firestore.Timestamp.fromDate(startDate),
    endDate: firestore.Timestamp.fromDate(endDate),
  } as Partial<Session>)
}

export function cancelSession(id: string) {
  return SessionCollection.doc(id).delete()
}

export function startSession(id: string, professor: Professor, location: string) {
  return SessionCollection.doc(id).update({
    professor: professor.uid,
    location: location,
    pending: false,
    professorName: professor.displayName
  } as Partial<Session>)
}