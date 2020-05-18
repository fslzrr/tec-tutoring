import { firestore } from '../config/firebase'

export const UserCollection = firestore.collection('users')
export const SessionCollection = firestore.collection('sessions')