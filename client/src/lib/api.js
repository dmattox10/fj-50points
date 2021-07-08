import axios from 'axios'

const devUrl = 'http://localhost:4444/api/v1/play'
const baseUrl = 'https://fj.hyperspacemg.com/v1/play'
const authUrl = 'https://auth.hyperspacemg.com/v1/auth'
const testUrl = 'https://auth.mattox.space/v1/auth'
const appName = 'FJ'

// Add token to req
axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken')
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
        let refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            return axios.post(`${testUrl}/refreshToken`, { refreshToken })
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem('accessToken', res.data.accessToken)
                        return axios(originalRequest)
                    }
                    // Do I need to do anything else here?
                })
        }
        return Promise.reject(error)
    }
)

const api = {
    register: values => {
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
    },
    login: values => {
        return axios.post(`${testUrl}/login`, values)
    },
    refreshToken: values => {
        return axios.post(`${testUrl}/refresh`, values)
    },
    logout: values => {
        return axios.delete(`${testUrl}/logout`, values)
    },
    getProtected: fullRoute => { // TODO change to baseUrl in prod
        return axios.get(`${devUrl}/${fullRoute}`)
    },
    postProtected: (route, values) => { // TODO change to baseUrl in prod
        return axios.post(`${devUrl}/${route}`, values)
    }
}

export default api