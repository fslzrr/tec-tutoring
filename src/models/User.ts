export interface User {
  uid: string;
  type: 'student' | 'professor';
}
export interface Professor extends User {
  area: string;
}
export interface Student extends User {
}
