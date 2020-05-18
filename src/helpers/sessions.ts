import { SessionCollection } from "../data/collections";
import { Session } from "../models/Session";

export function createSession(area: string, studentId: string) {
  return SessionCollection.add({
    area,
    student: studentId,
    pending: true,
  } as Partial<Session>)
}

export function startSession(id: string, professorId: string) {
  return SessionCollection.doc(id).update({
    professor: professorId,
    pending: false,
  } as Partial<Session>)
}