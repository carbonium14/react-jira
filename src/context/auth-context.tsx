import React, { ReactNode, useContext } from "react"
import * as auth from 'auth-provicer'
import { User } from 'types/user'
import { Http } from "utils/http"
import { useMount } from "utils"
import { useAsync } from "utils/use-async"
import { FullPageErrorFallBack, FullPageLoading } from "components/lib"
import { useQueryClient } from "react-query"
interface AuthForm {
    username: string,
    password: string
}
const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if(token) {
        const data = await Http('me',{token})
        user=data.user
    }
    return user
}
const AuthContext = React.createContext<{
    user: User|null,
    login: (form:AuthForm)=>Promise<void>,
    register: (form:AuthForm)=>Promise<void>,
    logout: ()=>Promise<void>
}|undefined>(undefined)
AuthContext.displayName = 'AuthContext'
export const AuthProvider = ({children}:{children:ReactNode}) => {
    const {data:user,error,isLoading,isIdle,isError,run,setData:setUser} = useAsync<User|null>()
    const queryClient = useQueryClient()
    const login = (form:AuthForm) => auth.login(form).then(setUser)
    const register = (form:AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(()=>{
        setUser(null)
        queryClient.clear()
    })
    useMount(()=>run(bootstrapUser()))
    if(isIdle||isLoading) {
        return <FullPageLoading></FullPageLoading>
    }
    if(isError) {
        <FullPageErrorFallBack error={error}></FullPageErrorFallBack>
    }
    return <AuthContext.Provider children={children} value={{user,login,register,logout}}></AuthContext.Provider>
}
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('useauth必须在authprovider中使用')
    }
    return context
}