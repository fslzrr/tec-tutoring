import React from "react"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { PageType } from "."
import Button from "../core/Button"
import { SessionCollection } from "../data/collections"
import { useCurrentUser } from "../helpers/users"
import { Professor } from "../models/User"
import { Session } from "../models/Session"
import { startSession } from "../helpers/sessions"

function getQuailfyingSessionsForCurrentUser(area: string) {
  return SessionCollection.where('area', '==', area)
    .where('pending', '==', true)
}

const ProfessorHome: React.FunctionComponent<PageType> = () => {
  const user = useCurrentUser<Professor>()
  const [values] = useCollectionData<Session>(
    getQuailfyingSessionsForCurrentUser(user?.area || ''), { idField: 'id' })

  return (
    <div>
      {user && values && values.map(s =>
        <li key={s.id}>{s.student}
          <Button onClick={() => startSession(s.id, user.uid)}>Aceptar</Button>
        </li>
      )}
    </div>
  );
};

export default ProfessorHome