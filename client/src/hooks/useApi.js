import axios from 'axios'
import { useStorageItem } from '@capacitor-community/react-hooks'

const devUrl = 'http://localhost:4444/api/v1/play'
const baseUrl = 'https://fj.hyperspacemg.com/v1/play'
const authUrl = 'https://auth.hyperspacemg.com/v1/auth'
const testUrl = 'https://auth.mattox.space/v1/auth'
const appName = 'FJ'



export const useApi = () => {

    const [accessToken, setAccessToken] = useStorageItem('auth', 'null')
    const [refreshToken, setRefreshToken] = useStorageItem('refresh', 'null')

    axios.interceptors.request.use(
        (config) => {
            if (accessToken) {
                config.headers['x-auth-token'] = accessToken
            }
            // TODO ELSE here to make sure we log in before we ever try to make a request!
            return config
        },
        (error) => {
            Promise.reject(error)
        }
    )
    
    // Refresh if token is expired
    axios.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            const originalRequest = error.config
            if (refreshToken && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                return axios.post(`${testUrl}/refreshToken`, { refreshToken })
                    .then(res => {
                        if (res.status === 200) {
                            setAccessToken(res.data.accessToken)
                            return axios(originalRequest)
                        }
                        // Do I need to do anything else here?
                    })
            }
            return Promise.reject(error)
        }
    )

    const isLoggedIn = () => {
        // test the access token against the api and return true or false based on the 200/401
    }

    const register = values => {
        const { username, password, online, location, gameId } = values
        const body = {
            username,
            password,
            referrer: appName,
            special: {
                online,
                location,
                gameId,
            }
        }
        return axios.post(`${testUrl}/register`, body)
    }

    const login = values => {
        return axios.post(`${testUrl}/login`, values)
    }

    const getRefreshToken = values => {
        return axios.post(`${testUrl}/refresh`, values)
    }

    const logout = values => {
        return axios.delete(`${testUrl}/logout`, values)
    }

    const getProtected = fullRoute => {
        return axios.get(`${devUrl}/${fullRoute}`)
    }

    const postProtected = (route, values) => {
        return axios.post(`${devUrl}/${route}`, values)
    }

    return [register, login, getRefreshToken, logout, getProtected, postProtected, isLoggedIn]
}