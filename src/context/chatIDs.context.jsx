import { createContext, useState } from "react";

const ChatIDsContext = createContext([])

function ChatIDsProviderWrapper(props) {

    const [chatIDs, setChatIDs] = useState([])
    const [offer, setOffer] = useState(null)

    return(
        <ChatIDsContext.Provider value={{chatIDs, setChatIDs, offer, setOffer}}>
            {props.children}
        </ChatIDsContext.Provider>
    )
}

export { ChatIDsContext, ChatIDsProviderWrapper }