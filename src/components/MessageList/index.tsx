import logo from "../../assets/logo.svg";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import io from "socket.io-client";

import styles from "./styles.module.scss";

type Message = {
    id: string,
    text: string,
    user: {
        name: string,
        avatar_url: string,
    }
}
const socket = io("http://localhost:4000/");
const messageQueue: Message[]=[]
socket.on("new_message", newMessage => {
    messageQueue.push(newMessage)
})
export function MessageList(){
    const [messages, setMessages] = useState<Message[]>([]);
    useEffect(()=>{
        const timer = setInterval(()=>{
            if(messageQueue.length > 0){
                setMessages(prevState => [
                    messageQueue[0],
                    prevState[0],
                    prevState[1],
                ].filter(Boolean))
                messageQueue.shift()
            }
        },3000)
    },[])
    useEffect(()=>{

        api.get<Message[]>("messages/Last3").then(response =>{
            setMessages(response.data);
        })
 
    },[])
    return(
        <div className={styles.messageListWrapper}>
            <img className={styles.img} src={logo} alt="DoWhile" />
            <ul className={styles.messageList}>

                {messages.map(message =>{
                    return(
                    <li key={message.id} className={styles.message}>
                        <p className={styles.messageContent}>{message.text}</p>
                        <div className={styles.messageUser}>
                                <div className={styles.messageUserImage}>
                                <img src={message.user.avatar_url} alt={message.user.name} />
                                </div>
                                <span>{message.user.name}</span>
                        </div> 
                    </li>
                    )
                })}
            
            </ul>
        </div>
    )
}