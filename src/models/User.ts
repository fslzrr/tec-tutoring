export interface User {
  uid: string;
  displayName: string;
  type: 'student' | 'professor';
}

export interface Professor extends User {
  type: 'professor'
  area: string;
  location: string;
}
export interface Student extends User {
  type: 'student'
}
