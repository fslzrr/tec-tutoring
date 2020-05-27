import React from "react"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { PageType } from "."
import { SessionCollection } from "../data/collections"
import { useCurrentUser } from "../helpers/users"
import { Session } from "../models/Session"
import { Student } from "../models/User"

function getQuailfyingSessionsForCurrentUser(id: string) {
    return SessionCollection.where('student', '==', id)
}

const ActiveSession: React.FunctionComponent<PageType> = (props) => {
    const user = useCurrentUser<Student>()
    const [values] = useCollectionData<Session>(
        getQuailfyingSessionsForCurrentUser(user?.uid || ''), { idField: 'id' })

    return (
        <div>
            {user && values && values.map(s =>
                <li key={s.id}>
                    <p>
                        StudentID: {s.student} <br></br>
                        ProfessorID: {s.professor} <br></br>
                        Area: {s.area} <br></br>
                        Location: {s.location} <br></br>
                        Pending: {s.pending && "True"} {!s.pending && "In Progress..."} <br></br>
                    </p>
                </li>
            )}
        </div>
    );
};

export default ActiveSession