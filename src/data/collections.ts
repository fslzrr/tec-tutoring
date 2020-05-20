import { firestore } from '../config/firebase'

export const UserCollection = firestore.collection('userProfiles')
export const SessionCollection = firestore.collection('sessions')