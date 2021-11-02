import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from '../services/api'


const signinURL = `https://github.com/login/oauth/authorize?scope=user&client_id=1aac16f9dec4f0c254b2`;
type AuthProvider = {
    children: ReactNode;
}
type User = {
    id: string,
    name: string,
    login: string,
    avatar_url: string
}
type AuthContextData = {
    user: User | null;
    signinURL: string;
    siginOut:() => void
}
export const AuthContext = createContext({} as AuthContextData);

type AuthResponse = {
    token: string,
    user:{
        id: string,
        avatar_url:  string,
        name:  string,
        login:  string
        
    }
}

export function AuthProvider(props: AuthProvider){
    const [user, setUser] = useState<User | null>(null)  
    
    
    

    async function signIn(gitCode:string) {
        const response = await api.post<AuthResponse>('authenticate',{code:gitCode})
        const {token, user} = response.data;
        localStorage.setItem('@tokenRND', token);
        setUser(user)  

    }

    function siginOut(){
        localStorage.removeItem('@tokenRND')
        setUser(null)
        window.location.reload()
    }
    useEffect(() => {
        const token = localStorage.getItem("@tokenRND")
        if(token){
            api.defaults.headers.common.authorization = `Bearer ${token}`
            api.get<User>('profile').then(response => setUser(response.data))

        }
    })
    useEffect(() => {
        
        const url = window.location.href;
        const hasGitCode = url.includes('?code')
        if(hasGitCode){
            const [urlWithouCode, gitCode] = url.split('?code=')
            window.history.pushState({},"", urlWithouCode)
            signIn(gitCode)
        }
    })
    
    
    return(
        <AuthContext.Provider value={{ signinURL , user , siginOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}