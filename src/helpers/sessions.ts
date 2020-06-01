import { SessionCollection } from "../data/collections";
import { Session } from "../models/Session";
import { Professor, Student } from "../models/User";

export function createSession(area: string, student: Student) {
  return SessionCollection.add({
    area,
    student: student.uid,
    pending: true,
    studentName: student.displayName,
  } as Partial<Session>)
}

export function startSession(id: string, professor: Professor, location: string) {
  return SessionCollection.doc(id).update({
    professor: professor.uid,
    location: location,
    pending: false,
    professorName: professor.displayName
  } as Partial<Session>)
}