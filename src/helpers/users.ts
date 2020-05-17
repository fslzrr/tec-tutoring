import { useState, useEffect } from "react"
import { firestore } from "firebase";
import { auth, firestore as fs } from "../config/firebase";

export interface User {
  uid: string
  type: 'student' | 'professor'
}

export interface Professor extends User {
  area: string
}

export interface Student extends User {

}

export function useCurrentUser<T extends User>() {
  const [currentUser, setCurrentUser] = useState<T|null|undefined>(undefined)
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection('users').doc(user?.uid)
          .get()
          .then((ref) => {
            const data = (ref as firestore.DocumentSnapshot<T>).data()
              setCurrentUser(data || null)
          })
      } else {
        setCurrentUser(null)
      }
    })
  }, [])

  return currentUser
}