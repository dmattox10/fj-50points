import Dexie from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'
import api from '../lib/api'

const db = new Dexie('fj')
db.version(1).stores({
    // players: `++id, name, score, uid`,
    group: 'uid, game, gameId, multiplier, username, updatedAt, online, location, players'
})

// TODO Heartbeat for connectivity and sync decisions?
export const useDexie = () => {

    const checkLocalStorage = area => {
        let status = false
        if (!localStorage.getItem(area)) {
            localStorage.setItem(area, status)
        } else {
            status = localStorage.getItem(area)
        }
        return status
    }

    const [players, updatePlayers] = useState(null)
    const [group, updateGroup] = useState(null)
    const [configured, setConfigured] = useState(checkLocalStorage('config'))
    const [formError, setFormError] = useState(null)
    const [gameError, setGameError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [doneSetup, setDoneSetup] = useState(checkLocalStorage('setup')) // need a method to check it

    const history = useHistory()

    const groupInfo = useLiveQuery(() => db.group.toArray(), []) // this isn't going to be populated over again?
    // const allPlayers = useLiveQuery(() => db.players.toArray(), [])

    useEffect(() => {
        if (!configured) {
            history.push('/settings')
        } else if (!configured && doneSetup) {
            const groupObj = {
                uid: groupInfo[0].uid || false,
                game: groupInfo[0].game,
                gameId: groupInfo[0].gameId,
                username: groupInfo[0].username || false,
                updatedAt: groupInfo[0].updatedAt || false,
                online: groupInfo[0].online || false,
                location: groupInfo[0].location || false,
                multiplier: groupInfo[0].multiplier,
                players: groupInfo[0].players
            }
            updateGroup({
                ...group,
                ...groupObj
            })
        }

        if (group && group.online) { // should this be setTimeout, useInterval?
            // TODO sync here, heartbeat?
        }

    }, [players, group])

    

    const editGroup = values => {
        
    }

    const setup = values => {
        const { game, gameId, multiplier, playerName, startingScore } = values
        let config = true
        localStorage.setItem('config', config)
        setConfigured(config)
        db.group.put({})
    }

    const addPlayer = values => {

    }

    const removePlayer = player => {

    }


    const doLogin = async values => {
        setIsLoading(prevIsLoading => !prevIsLoading)
        let res
        try {
            res = await api.login(values)
            let { accessToken, refreshToken, username, online, location, gameId } = res.data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
        } catch (error) {
            console.error(error)
            setFormError(error)
            setIsLoading(prevIsLoading => !prevIsLoading)
        }
        // TODO Error handling here
        setFormError(null)
        setIsLoading(prevIsLoading => !prevIsLoading)
    }

    const doRegister = async values => {
        setIsLoading(prevIsLoading => !prevIsLoading)
        let res
        try {
            res = await api.register(values)
            setFormError(null)
            let { accessToken, refreshToken } = res.data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
        } catch (error) {
            console.error(error)
            setFormError(error)
            setIsLoading(prevIsLoading => !prevIsLoading)
        }
        // TODO Error handling here
        
        
        setIsLoading(prevIsLoading => !prevIsLoading)
    }

    const sync = () => {

    }

    return [configured, players, group, doLogin, doRegister, formError, gameError, isLoading, removePlayer, editGroup, addPlayer, setup]
}