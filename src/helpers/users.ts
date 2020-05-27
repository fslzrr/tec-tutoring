import { useState, useEffect } from "react"
import { firestore } from "firebase";
import { auth } from "../config/firebase";
import { UserCollection } from "../data/collections";
import { User } from "../models/User";
import { Professor } from "../models/User"

export function useCurrentUser<T extends User>() {
  const [currentUser, setCurrentUser] = useState<T | null | undefined>(undefined)
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        UserCollection.doc(user?.uid)
          .get()
          .then((ref) => {
            const data = (ref as firestore.DocumentSnapshot<T>).data()
            setCurrentUser({ uid: user.uid, ...data } as T || null)
          })
      } else {
        setCurrentUser(null)
      }
    })
  }, [])
  return currentUser
}

export function saveLocation(professor: Professor, location: string) {
  return UserCollection.doc(professor.uid).update({
    location: location,
  } as Professor)
}