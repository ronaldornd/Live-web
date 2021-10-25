import styles from "./styles.module.scss";
import {VscGithubInverted, VscSignIn} from "react-icons/vsc";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";

export function LoginBox(){
    const {signinURL} = useContext(AuthContext)
    return(
        <div className={styles.LoginBoxWrapper}>
        
            <strong>Entre para trocar mensagens com a comunidade</strong>
      

            <a href={`${signinURL}`} className={styles.signInGithub}>
                <VscGithubInverted size="24"/>
                Entrar com Github
            </a>
        </div>
    )
}