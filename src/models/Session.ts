import { firestore } from 'firebase'

// Used this instead of enum, cause enum was giving trouble with firestore
export const kSessionState = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  ENDED: "ENDED",
}

export interface Session {
  id: string;
  student: string;
  studentName: string;
  area: string;
  professor: string;
  professorName: string;
  location: string;
  pending: boolean;
  sessionState: string;
  startDate: firestore.Timestamp;
  endDate: firestore.Timestamp;
}
