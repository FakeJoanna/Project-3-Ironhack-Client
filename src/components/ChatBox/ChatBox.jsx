import "./ChatBox.css"

import axios from "axios"

import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { ChatIDsContext } from "../../context/chatIDs.context"
import { LanguageContext } from "../../context/lang.context"
import { io } from "socket.io-client"

const API_URL =  process.env.REACT_APP_API_URL
const CHAT_URL = process.env.REACT_APP_CHAT_URL

const socket = io(CHAT_URL, {
    autoConnect: false //if not set to false, will connect to server every time component reloads
})

function ChatBox({ singleChat })  {
    
    const navigate = useNavigate()
    const [allMessages, setAllMessages] = useState(singleChat.messageHistory)
    const [newMessage, setNewMessage] = useState("")
    const chatBoxRef = useRef(null)
    const { language } = useContext(LanguageContext)

    const { user } = useContext(AuthContext)
    const { offer, setOffer } = useContext(ChatIDsContext)

    //storing other users' profile picture in a variable for display in the chat
    let otherUserPFP
    let otherUserName
    if(singleChat.users[0]._id === user._id) {
        otherUserPFP = singleChat.users[1].profilePicture
        otherUserName = singleChat.users[1].name
    }
    else {
        otherUserPFP = singleChat.users[0].profilePicture
        otherUserName = singleChat.users[0].name
    }
    
    //offer message useffect
    useEffect(() => {
        if(!offer) {
            return
        }

        axios.get(`${API_URL}/api/products/${offer.productId}`)
        .then((response) => {
            
            const offerMessage = "Offer: " + offer.price.toString() + "€";
            const offerData = {
                room: singleChat._id,
                content: offerMessage,
                sender: user._id,
                timestamp: new Date().toISOString(),
                isOffer: response.data,
            }
            setAllMessages(prevState => [...prevState, offerData])
            socket.emit("send_message", offerData)

            const messageToStore = {
                content: offerMessage,
                sender: user._id,
                isOffer: response.data,
            }
            axios.post(`${API_URL}/chat/append-message`, {roomID: singleChat._id, messageToStore: messageToStore})
        })
    
        
    }, [offer])

    //This useEffect adds an event listener for the enter key to send messages and joins a socket room whose ID is determined by the MongoDB Room document - this makes each room unique and avoids user collisions
    useEffect(() => {
        //we connect to the client, we join a room, and we set up an event listener to receive messages

        socket.connect()
        socket.emit("join_room", singleChat._id)
        
        socket.on("receive_message", data => {
            
            const socketMessage = {
                content: data.content,
                sender: data.sender,
                timestamp: data.timestamp,
                isOffer: data.isOffer,
            }
            setAllMessages(prevState => [...prevState, socketMessage])
        })

        return () => {
            socket.disconnect()
            setOffer(null)
        }
    }, [])

    //UseEffect that scrolls to the bottom when a new message loads
    useEffect(() => {
        scrollToBottom()
    }, [allMessages])

    function handleEnterKeypress(e) {
        if(newMessage === "") {
            return
        }
        
        if(e.key === "Enter") {
            const socketData = {
                room: singleChat._id,
                content: newMessage,
                sender: user._id,
                timestamp: new Date().toISOString()
            }
            setAllMessages(prevState => [...prevState, socketData])
            socket.emit("send_message", socketData)
            
            const messageToStore = {
                content: newMessage,
                sender: user._id,
            }
            setNewMessage("")
            axios.post(`${API_URL}/chat/append-message`, {roomID: singleChat._id, messageToStore: messageToStore})
        }

    }

    function storeNewMesage(e) {
        setNewMessage(e.target.value)
    }

    function scrollToBottom() {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }

    //In-chat offer functionality

    function acceptOffer(index) {
        const acceptedOfferUpdate = [...allMessages]

        const offerProductId = acceptedOfferUpdate[index].isOffer._id

        acceptedOfferUpdate[index] = {
            ...acceptedOfferUpdate[index], 
            isOffer: null
        }

        setAllMessages(acceptedOfferUpdate)

        const socketData = {
            room: singleChat._id,
            content: "The offer has been accepted",
            sender: user._id,
            timestamp: new Date().toISOString(),
            hasCheckoutButton: offerProductId,
        }
        setAllMessages(prevState => [...prevState, socketData])
        socket.emit("send_message", socketData)

        axios.post(`${API_URL}/chat/interact-offer`, {roomID: singleChat._id, checkoutButtonRemove: true})
        
        .then(() => {
            const messageToStore = {
                content: "The offer has been accepted",
                sender: user._id,
                hasCheckoutButton: offerProductId,
            }
            axios.post(`${API_URL}/chat/append-message`, {roomID: singleChat._id, messageToStore: messageToStore})
        })
        .catch(err => console.log(err))
    }

    function declineOffer(index) {
    
        const declinedOfferUpdate = [...allMessages]
        declinedOfferUpdate[index] = {
            ...declinedOfferUpdate[index], 
            isOffer: null
        }

        setAllMessages(declinedOfferUpdate)

        const socketData = {
            room: singleChat._id,
            content: "The offer has been refused",
            sender: user._id,
            timestamp: new Date().toISOString()
        }
        setAllMessages(prevState => [...prevState, socketData])
        socket.emit("send_message", socketData)

        axios.post(`${API_URL}/chat/interact-offer`, {roomID: singleChat._id})

        .then(() => {
            const messageToStore = {
                content: "The offer has been refused",
                sender: user._id,
            }
            axios.post(`${API_URL}/chat/append-message`, {roomID: singleChat._id, messageToStore: messageToStore})
        })
        .catch(err => console.log(err))
    }

    function deleteChat() {
        axios.post(`${API_URL}/chat/delete-chat`, {roomID: singleChat._id})
        .then(() => window.location.reload())
        .catch(err => console.log(err))
    }

    function chatCheckout(productId) {
        axios.post(`${API_URL}/chat/checked-out`, {roomID: singleChat._id})
        .then(() => {
            navigate(`/checkout/${productId}`)
        })
    }

    return (
        <>
            <div className="chatHeaderDiv">
                {otherUserName && language === "EN" && <p className="chatHeaderText">You're talking to {otherUserName}</p>}
                {otherUserName && language === "FR" && <p className="chatHeaderText">Vous discutez avec {otherUserName}</p>}
                {otherUserName && language === "ES" && <p className="chatHeaderText">Estas hablando con {otherUserName}</p>}
                <img className="deleteChatIcon" src="https://i.imgur.com/bPjT4w5.png" alt="" onClick={deleteChat}/>
            </div>
            <div className="messagesDiv" ref={chatBoxRef}>
                {allMessages.map((message, index) => {
                    const formattedTime = new Intl.DateTimeFormat(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                    }).format(new Date(message.timestamp)).toString().substring(0, 5)
                    
                    return (
                        <div key={index} className={message.sender === user._id ? "singleMessageDiv yourOwn" : "singleMessageDiv otherUser"}>

                        {message.isOffer
                        
                        ? 

                        <>
                            {message.sender === user._id
                            
                            ?

                            <div className="offerMessageWrapper">
                                <div className="offerMessage">
                                    <p className="yourOfferMessageTime">{formattedTime}</p>
                                    <p className="messageText offerMessageText">{message.content}
                                        <span className="offerTitle">{message.isOffer.title}</span>
                                        <img className="offerImage" src={message.isOffer.img[0]} alt="" />
                                    </p>
                                    <img className="messagePFP" src={user.profilePicture} alt="" />
                                </div>
                            </div>                             

                            :

                            <div className="offerMessageWrapper">
                                <div className="offerMessage">
                                    <img className="messagePFP" src={otherUserPFP} alt="" />
                                    <p className="messageText offerMessageText">{message.content}
                                        <span className="offerTitle">{message.isOffer.title}</span>
                                        <img className="offerImage" src={message.isOffer.img[0]} alt="" />
                                    </p>
                                    <p className="otherUserTime">{formattedTime}</p>
                                </div>
                                <div className="chatOfferButtons">
                                    { language === "EN" && <button onClick={() => acceptOffer(index)}>Accept</button>}
                                    { language === "FR" && <button onClick={() => acceptOffer(index)}>Accepter</button>}
                                    { language === "ES" && <button onClick={() => acceptOffer(index)}>Aceptar</button>}
                                    { language === "EN" && <button onClick={() => declineOffer(index)}>Decline</button>}
                                    { language === "FR" && <button onClick={() => declineOffer(index)}>Refuser</button>}
                                    { language === "ES" && <button onClick={() => declineOffer(index)}>Rechazar</button>}
                                </div>
                            </div>}
                        </>

                        :

                        <>
                            {message.sender === user._id
                            
                            ?

                            <div className="checkoutMessageWrapper">
                                <div className="message">
                                    <p className="yourMessageTime">{formattedTime}</p>
                                    <p className="messageText">{message.content}</p>
                                    <img className="messagePFP" src={user.profilePicture} alt="" />
                                </div>
                                {message.hasCheckoutButton && language === "EN" && <button onClick={() => chatCheckout(message.hasCheckoutButton)}>Checkout</button>}
                                {message.hasCheckoutButton && language === "FR" && <button onClick={() => chatCheckout(message.hasCheckoutButton)}>Payer</button>}
                                {message.hasCheckoutButton && language === "ES" && <button onClick={() => chatCheckout(message.hasCheckoutButton)}>Pagar</button>}
                            </div>                               

                            :

                            <div className="messageWrapper">
                                <div className="message">
                                    <img className="messagePFP" src={otherUserPFP} alt="" />
                                    <p className="messageText">{message.content}</p>
                                    <p className="otherUserTime">{formattedTime}</p>
                                </div>
                            </div>}
                        </>

                        }
                        </div>
                    )
                })}
            </div>

            <div className="messageInputDiv">
                <input className='chatInput' value={newMessage} type="text" placeholder="Send a message" onChange={storeNewMesage} onKeyDown={handleEnterKeypress}/>
            </div>
        </>
    )

}

export default ChatBox