import React, { useState, useEffect } from "react"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { PageType } from "."
import { SessionCollection } from "../data/collections"
import { useCurrentUser, saveLocation } from "../helpers/users"
import { Professor } from "../models/User"
import { Session } from "../models/Session"
import { startSession } from "../helpers/sessions"

function getActiveSessionsOfCurrentUser(professorId: string) {
  return SessionCollection.where('professor', '==', professorId)
}

function getPendingSessions() {
  return SessionCollection.where('pending', '==', true)
}

function getUniqueAreasFromSessions(sessions: Session[] | undefined) {
  return sessions ? Array.from(new Set(sessions.map(s => s.area))).sort() : ['']
}

// TODO: Add active sessions on the right.
const ProfessorHome: React.FunctionComponent<PageType> = () => {
  const user = useCurrentUser<Professor>()
  const [pendingSessions] = useCollectionData<Session>(getPendingSessions(), { idField: 'id' })
  const [activeSessions] = useCollectionData<Session>(
    getActiveSessionsOfCurrentUser(user?.uid || ''), { idField: 'id' })
  const areas: Array<string> = getUniqueAreasFromSessions(pendingSessions)
  const [area, setArea] = useState(areas[0] ? areas[0] : 'none')
  const [location, setLocation] = useState('')

  // setState when dependecy user changes.
  useEffect(() => setLocation(user?.location || 'biblio'), [user])

  const onSaveLocationClicked = () => {
    if (!user || !location) return user
    saveLocation(user as Professor, location)
      .then(() => {
        user.location = location
        console.log("Saved location " + user.location + ".")
      })
  }

  return (
    <div>
      <div> {/* Professor's Location for sessions */}
        <label>Location:
        <input
            name="location"
            placeholder="ubicacion de asesoria"
            value={location}
            onChange={event => setLocation(event.target.value)} />
        </label>
        <button
          disabled={!location}
          onClick={onSaveLocationClicked}>Save</button>
      </div>
      <div> {/* Unique Areas dropdown */}
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
      <div> {/* Active Sessions */}
        <h3>{user?.displayName}s' Active Sessions</h3>
        {user && activeSessions && activeSessions.map(s =>
          !s.pending &&
          <li key={s.id}>
            {s.id}
          </li>
        )}
      </div>
      <div> {/* Pending Sessions */}
        <h3> Students' Pending Sessions (Area: {area})</h3>
        {user && pendingSessions && pendingSessions.map(s =>
          s.area === area &&
          <li key={s.id}>{s.student}
            <button onClick={() => startSession(s.id, user)}>Aceptar</button>
          </li>
        )}
      </div>
    </div>
  );
};

export default ProfessorHome