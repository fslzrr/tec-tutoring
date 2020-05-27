import { SessionCollection } from "../data/collections";
import { Session } from "../models/Session";
import { Professor } from "../models/User";

export function createSession(area: string, studentId: string) {
  return SessionCollection.add({
    area,
    student: studentId,
    pending: true,
  } as Partial<Session>)
}

export function startSession(id: string, professor: Professor) {
  return SessionCollection.doc(id).update({
    professor: professor.uid,
    location: professor.location ? professor.location : 'biblio',
    pending: false,
  } as Partial<Session>)
}