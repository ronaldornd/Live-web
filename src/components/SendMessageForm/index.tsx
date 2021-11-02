import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { IoIosSend } from "react-icons/io";
import styles from "./styles.module.scss";
import { api } from "../../services/api";
export function SendMessageForm(){
    const { user,  siginOut } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    async function sendMessage(event: FormEvent){
        event.preventDefault();
        if(!message.trim()){
            return;
        }
        await api.post('messages',{message})
        setMessage('')
    }
    
    return(
        <div className={styles.sendMessageWrapper}>
            <button onClick={siginOut} className={styles.signOut}><VscSignOut size="32"/></button>
            
            <header className={styles.userInfo}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url}></img>
                </div>
                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGit}>
                    <VscGithubInverted size="16"/>
                    {user?.login}
                </span>
            </header>
            
            <form className={styles.sendMessageForm} onSubmit={sendMessage}>
                <label htmlFor="message">Mensagem</label>
                <textarea name="message" id="message" placeholder="Fala aew!"
                onChange={event => setMessage(event.target.value)} value={message}>
                </textarea>
                <button type="submit" >Enviar <IoIosSend size="24"/></button>
            </form>
        </div>
    )
}