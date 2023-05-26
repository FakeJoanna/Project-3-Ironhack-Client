import { createContext, useState } from "react"

const LanguageContext = createContext()

function LanguageProviderWrapper(props) {
    const [language, setLanguage] = useState("EN")

    return(
        <LanguageContext.Provider value={{language, setLanguage}}>
            {props.children}
        </LanguageContext.Provider>
    )
}

export { LanguageProviderWrapper, LanguageContext }