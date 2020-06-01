import { firestore } from 'firebase'

export interface Session {
  id: string;
  student: string;
  studentName: string;
  area: string;
  professor: string;
  professorName: string;
  location: string;
  pending: boolean;
  startDate: firestore.Timestamp
  endDate: firestore.Timestamp
}
