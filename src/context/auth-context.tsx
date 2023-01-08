import { ReactNode, useCallback } from "react"
import * as auth from 'auth-provicer'
import { User } from 'screens/project-list/search-panel'
import { Http } from "utils/http"
import { useMount } from "utils"
import { useAsync } from "utils/use-async"
import { FullPageErrorFallBack, FullPageLoading } from "components/lib"
import * as authStore from 'store/auth.slice'
import { useDispatch } from "react-redux"
import { UserSelect } from "components/user-select"
import { AppDispatch } from "store"
export interface AuthForm {
    username: string,
    password: string
}
export const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if(token) {
        const data = await Http('me',{token})
        user=data.user
    }
    return user
}
export const AuthProvider = ({children}:{children:ReactNode}) => {
    const {error,isLoading,isIdle,isError,run} = useAsync<User|null>()
    const dispatch:(...args:unknown[])=>Promise<User>=useDispatch<AppDispatch>()
    useMount(()=>run(dispatch(bootstrapUser())))
    if(isIdle||isLoading) {
        return <FullPageLoading></FullPageLoading>
    }
    if(isError) {
        <FullPageErrorFallBack error={error}></FullPageErrorFallBack>
    }
    return <div>{children}</div>
}
export const useAuth = () => {
    const dispatch:(...args:unknown[])=>Promise<User>=useDispatch<AppDispatch>()
    const user=UserSelect(authStore.selectUser)
    const login=useCallback((form:AuthForm)=>dispatch(authStore.login(form)),[dispatch])
    const register=useCallback((form:AuthForm)=>dispatch(authStore.register(form)),[dispatch])
    const logout=useCallback(()=>dispatch(authStore.logout()),[dispatch])
    return {
        user,
        login,
        register,
        logout
    }
}