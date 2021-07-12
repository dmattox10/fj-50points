import Dexie from 'dexie'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { useStorageItem } from '@capacitor-community/react-hooks'

import api from '../lib/api'

const db = new Dexie('fj')
db.version(1).stores({
    // players: `++id, name, score, uid`,
    group: 'uid, game, gameId, multiplier, username, updatedAt, online, location, players'
})

// TODO Heartbeat for connectivity and sync decisions?
export const useDexie = () => {

    // const checkLocalStorage = () => {
    //     let config = false
    //     if (!localStorage.getItem('configured')) {
    //         localStorage.setItem('configured', config)
    //     } else {
    //         config = localStorage.getItem(config)
    //     }
    //     return config
    // }

    const [players, updatePlayers] = useState(null)
    const [group, updateGroup] = useState(null)
    // const [configured, setConfigured] = useState(checkLocalStorage('configured'))
    const [configured, setConfigured] = useStorageItem('configured', false)
    const [formError, setFormError] = useState(null)
    const [gameError, setGameError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [authToken, setAuthToken] = useStorageItem('auth', 'null')
    const [refreshToken, setRefreshToken] = useStorageItem('refresh', 'null')
    const [isLoggedIn, setIsLoggedIn] = useState(checkToken())

    const history = useHistory()

    const checkToken = () => {
        const [token, setToken]
    }

    // const allPlayers = useLiveQuery(() => db.players.toArray(), [])

    useEffect(() => {
        if (!configured) {
            history.push('/settings')
        } else {
            loadData()
        }

        if (group && group.online) { // should this be setTimeout, useInterval?
            // TODO sync here, heartbeat?
        }

    }, [players, group])

    

    const editGroup = values => {
        const { game, gameId, multiplier, playerName, startingScore } = values
        let config = true
        localStorage.setItem('configured', config)
        setConfigured(config)
        // db.group.put({})
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
            setFormError(null)
            const { accessToken, refreshToken, special } = res.data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            // TODO Switch API's here!
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
            // TODO Switch API's here!
        } catch (error) {
            console.error(error)
            setFormError(error)
            setIsLoading(prevIsLoading => !prevIsLoading)
        }
        // TODO Error handling here
        
        
        setIsLoading(prevIsLoading => !prevIsLoading)
    }

    const loadData = async () => {
        
    }

    const sync = () => {

    }

    return [configured, players, group, doLogin, doRegister, formError, gameError, isLoading, removePlayer, editGroup, addPlayer, isLoggedIn]
}