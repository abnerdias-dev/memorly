import { createContext, useContext, useState } from "react";

const IconContext = createContext();

export function IconProvider({ children }) {
    const [selectedIcon, setSelectedIcon] = useState("code")

    return (
        <IconContext.Provider value={{selectedIcon, setSelectedIcon}}>
            {children}
        </IconContext.Provider>
    )
}

export function useIcon () {
    return useContext(IconContext)
}