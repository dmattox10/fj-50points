import Dexie from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

const db = new Dexie('fj')
db.version(1).stores({
    players: `++id, name, score, uid`,
    group: 'uid, game, multiplier, email, updatedAt, online'
})

// TODO Heartbeat for connectivity and sync decisions?
export const useDexie = () => {

    const [players, updatePlayers] = useState({})
    const [group, updateGroup] = useState({})
    const [configured, setConfigured] = useState(false)
    const [formError, setFormError] = useState(null)
    const [gameError, setGameError] = useState(null)

    const groupInfo = useLiveQuery(() => db.group.toArray(), [])
    const allPlayers = useLiveQuery(() => db.players.toArray(), [])
    
    useEffect(() => {

        
        if (groupInfo === undefined || !allPlayers) {

        } else {
            setConfigured(true)
            const groupObj = {
                uid: groupInfo[0].uid,
                game: groupInfo[0].game,
                email: groupInfo[0].email,
                updatedAt: groupInfo[0].updatedAt,
                online: groupInfo[0].online
            }
            updateGroup({
                ...group,
                ...groupObj
            })
        }

    }, [players, group])

    const doLogin = values => {

    }

    const doRegister = values => {

    }

    return [configured, players, group, doLogin, doRegister, formError, gameError]
}