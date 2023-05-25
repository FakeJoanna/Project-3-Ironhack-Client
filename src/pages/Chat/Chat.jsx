import "./Chat.css"

import axios from "axios"

import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../context/auth.context";
import { ChatIDsContext } from "../../context/chatIDs.context"

import ChatBox from "../../components/ChatBox/ChatBox"
import Loading from "../../components/Loading/Loading";

const API_URL = "http://localhost:5005"

function Chat() {

    const { user } = useContext(AuthContext)
    const { chatIDs } = useContext(ChatIDsContext)

    const [allChats, setAllChats] = useState(null)
    const [singleChat, setSingleChat] = useState(null)
    const [chatId, setChatId] = useState("1")

    //When we get to this page, we need to do two things. We need to fetch every existing chat this user has had, and we need to fetch the specific chat the are trying to start right now OR create it if it's new
    useEffect(() => {
        if(!user) { //early exit in case user is empty
            return
        }

        axios.post(`${API_URL}/chat/all-chats`, user)
        .then(response => {
            if(response.data.length === 0) {
                return
            }
            else {
                setAllChats(response.data)
            }
        })
        .catch(err => console.log(err))    
    }, [user])


    useEffect(() => {
        if(!chatIDs) { //early exit
            return
        }
        
        if(chatIDs.length === 0) { //if the user navigates to the chat page not through a profile page
            return
        }

        else {
            axios.post(`${API_URL}/chat/single-chat`, {chatIDs: chatIDs})
            .then(response => {
                setSingleChat(response.data[0])
            })
            .catch(err => console.log(err))
        }
    }, [chatIDs])

    function changeChat(chat) {
        setSingleChat(chat)
        setChatId(Math.random().toString())
    }

    return (
        <div className="chatPageDiv">
            <div className="chatPageWrapper">
                <div className="chatBoxDiv">

                    <div className="chatSideBar">
                        {allChats ?
                        
                        allChats.map(chat => {
                            const otherUser = chat.users.find(userFromArray => userFromArray._id !== user._id)
                            
                            return(
                                <div className="sideBarChatDiv" onClick={() => changeChat(chat)}>
                                    <img src={otherUser.profilePicture} alt="" />
                                    <p>{otherUser.name}</p>
                                </div>
                            )
                        })

                        :

                        <p className="noChatsText">You have no chats</p>

                        }
                    </div>

                    <div className="mainChatDiv">
                        {singleChat ? 
                        
                        <ChatBox key={chatId} singleChat={singleChat} />
                        
                        :

                        <Loading />

                        }
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default Chat