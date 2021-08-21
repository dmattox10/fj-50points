import Dexie from 'dexie'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { useStorageItem } from './useStorage'

// import { useApi } from './useApi'

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
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const history = useHistory()

    const checkToken = async () => {
        const res = await api.getProtected()
        if (res.status === 200) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
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

        if(!isLoggedIn) {
            checkToken()    
        }

    }, [players, group])

    

    const editGroup = values => {
        const { game, gameId, multiplier, playerName, startingScore } = values
        // let config = true
        // localStorage.setItem('configured', config)
        setConfigured(true)
        // db.group.put({})
    }

    const addPlayer = values => {

    }

    const removePlayer = player => {

    }


    const doLogin = async (values, cb) => {
        setIsLoading(prevIsLoading => !prevIsLoading)
        let res
        try {
            res = await api.login(values)
            switch (res.status) {
                case 200: //success
                    setFormError(null)
                    const special = res.data
                    // localStorage.setItem('accessToken', accessToken)
                    setAuthToken(res.data.accessToken)
                    setRefreshToken(res.data.refreshToken)
                    // localStorage.setItem('refreshToken', refreshToken)
                    // TODO Switch API's here!
                    setIsLoggedIn(true)
                    cb()
                break;
                default: // uh oh
                    setFormError('Something went wrong.')
                    setIsLoading(prevIsLoading => !prevIsLoading)
            }
        } catch (error) {
            console.error(error)
            setFormError(error)
            setIsLoading(prevIsLoading => !prevIsLoading)
        }
        // TODO Error handling here
        setIsLoggedIn(false)
        setFormError(null)
        setIsLoading(prevIsLoading => !prevIsLoading)
    }

    const doRegister = async (values, cb) => {
        setIsLoading(prevIsLoading => !prevIsLoading)
        let res
        try {
            res = await api.register(values)
            switch (res.status) {
                case 201: //success
                setFormError(null)
                // let { accessToken, refreshToken } = res.data
                // localStorage.setItem('accessToken', accessToken)
                // localStorage.setItem('refreshToken', refreshToken)
                setAuthToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setIsLoggedIn(true)
                cb()
                // TODO Switch API's here!
                break;
                case 400: //user exists
                    setFormError('Error, user exists!')
                    setIsLoading(prevIsLoading => !prevIsLoading)
                break;
                default:
                    setFormError('Something went wrong.')
                    setIsLoading(prevIsLoading => !prevIsLoading)

            }
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