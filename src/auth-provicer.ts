import {User} from 'types/user'
const apiUrl = process.env.REACR_APP_API_URL
const localStrogekey = '__auth_provider_token__'
export const getToken = () => window.localStorage.getItem(localStrogekey)
export const handleUserResponse = ({user}:{user:User}) => {
    window.localStorage.setItem(localStrogekey,user.token||'')
    return user
}
export const login = async (data:{username:string,password:string}) => {
    const res = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        return handleUserResponse(await res.json())
    } else {
        return Promise.reject(await res.json())
    }
}
export const register = async (data:{username:string,password:string}) => {
    const res = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (res.ok) {
        return handleUserResponse(await res.json())
    } else {
        return Promise.reject(await res.json())
    }
}
export const logout = async () => window.localStorage.removeItem(localStrogekey)