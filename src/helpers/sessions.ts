import { firestore } from 'firebase';
import moment from 'moment';
import { SessionCollection } from "../data/collections";
import { Session, kSessionState } from "../models/Session";
import { Professor, Student } from "../models/User";


function getNextDates() {
  const dates = moment(moment.now())
  const day = moment(`${dates.year()}/${dates.month() + 1}/${dates.date()}`)
  const startDate = day.add('hours', dates.hour() + 1)

  return {
    startDate: startDate.toDate(),
    endDate: startDate.add('hour', 1).toDate(),
  }
}

export function createSession(area: string, student: Student) {
  const { startDate, endDate } = getNextDates()

  return SessionCollection.add({
    area,
    student: student.uid,
    pending: true,
    sessionState: kSessionState.PENDING,
    location: "Por definir",
    studentName: student.displayName,
    startDate: firestore.Timestamp.fromDate(startDate),
    endDate: firestore.Timestamp.fromDate(endDate),
  } as Partial<Session>)
}

export function cancelSession(id: string) {
  return SessionCollection.doc(id).delete()
}

export function endSession(id: string) {
  return SessionCollection.doc(id).update({
    // Because startDate is rounded to next hour && because professors
    // can start new session before it's startDate, the endDate might
    // be updated to a date before startDate.
    endDate: firestore.Timestamp.fromDate(new Date(Date.now())),
    sessionState: kSessionState.ENDED
  } as Partial<Session>)
}

export function startSession(id: string, professor: Professor, location: string) {
  return SessionCollection.doc(id).update({
    professor: professor.uid,
    location: location,
    pending: false,
    sessionState: kSessionState.ACTIVE,
    professorName: professor.displayName
  } as Partial<Session>)
}