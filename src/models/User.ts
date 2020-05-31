export interface User {
  uid: string;
  displayName: string;
  type: 'student' | 'professor';
}
export interface Professor extends User {
  type: 'student'
  area: string;
  location: string;
}
export interface Student extends User {
  type: 'professor'
}
