import React, { useState } from "react"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { PageType } from "."
import Button from "../core/Button"
import { SessionCollection } from "../data/collections"
import { useCurrentUser } from "../helpers/users"
import { Professor } from "../models/User"
import { Session } from "../models/Session"
import { startSession } from "../helpers/sessions"

function getQuailfyingSessionsForCurrentUser(area: string) {
  return SessionCollection.where('pending', '==', true)
}

function getUniqueAreasFromSessions(sessions: Session[] | undefined) {
  return sessions ? Array.from(new Set(sessions.map(s => s.area))).sort() : ['']
}

const ProfessorHome: React.FunctionComponent<PageType> = () => {
  const user = useCurrentUser<Professor>()
  const [values] = useCollectionData<Session>(
    getQuailfyingSessionsForCurrentUser(user?.area || ''), { idField: 'id' })

  const areas: Array<string> = getUniqueAreasFromSessions(values)
  const [area, setArea] = useState(areas[0] ? areas[0] : 'none')

  return (
    <div>
      <div>
        <select
          id="dropdown"
          value={area}
          onChange={event => setArea(event.target.value)}>
          <option key='none'>none</option>
          {user && areas && areas.map(a =>
            <option key={a}>
              {a}
            </option>
          )}
        </select>
      </div>
      <div>
        {user && values && values.map(s =>
          // TODO: Fix: When first loaded it doesn't display any sessions, even though the select has a value,
          // it only displays after selecting something.
          // HOTFIX: Added none as default selector.
          s.area === area &&
          <li key={s.id}>{s.student}
            <Button onClick={() => startSession(s.id, user.uid)}>Aceptar</Button>
          </li>
        )}
      </div>
    </div>
  );
};

export default ProfessorHome