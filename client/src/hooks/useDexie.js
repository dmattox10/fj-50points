import Dexie from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'
import api from '../lib/api'

const db = new Dexie('fj')
db.version(1).stores({
    players: `++id, name, score, uid`,
    group: 'uid, game, multiplier, email, updatedAt, online, location'
})

// TODO Heartbeat for connectivity and sync decisions?
export const useDexie = () => {

    const checkLocalStorage = () => {
        let config = false
        if (!localStorage.getItem('config')) {
            localStorage.setItem('config', config)
        } else {
            config = localStorage.getItem(config)
        }
        return config
    }

    const [players, updatePlayers] = useState(null)
    const [group, updateGroup] = useState(null)
    const [configured, setConfigured] = useState(checkLocalStorage())
    const [formError, setFormError] = useState(null)
    const [gameError, setGameError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()

    const groupInfo = useLiveQuery(() => db.group.toArray(), [])
    const allPlayers = useLiveQuery(() => db.players.toArray(), [])

    useEffect(() => {
        if (!configured) {
            history.push('/settings')
        } else {
            const groupObj = {
                uid: groupInfo[0].uid,
                game: groupInfo[0].game,
                email: groupInfo[0].email,
                updatedAt: groupInfo[0].updatedAt,
                online: groupInfo[0].online,
                location: groupInfo[0].location
            }
            console.log(groupInfo[0].game)
            updateGroup({
                ...group,
                ...groupObj
            })
        }

        if (group && group.online) {
            // TODO sync here
        }

    }, [players, group])

    

    const settings = values => {

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
        } catch (error) {
            console.error(error)
            setFormError(error)
            setIsLoading(prevIsLoading => !prevIsLoading)
        }
        let { accessToken, refreshToken } = res.data
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        setFormError(null)
        setIsLoading(prevIsLoading => !prevIsLoading)
    }

    const doRegister = async values => {
        setIsLoading(prevIsLoading => !prevIsLoading)
        let res
        try {
            res = await api.register(values)
        } catch (error) {
            console.error(error)
            setFormError(error)
            setIsLoading(prevIsLoading => !prevIsLoading)
        }
        let { accessToken, refreshToken } = res.data
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        setFormError(null)
        setIsLoading(prevIsLoading => !prevIsLoading)
    }

    return [configured, players, group, doLogin, doRegister, formError, gameError, isLoading, removePlayer, settings, addPlayer]
}