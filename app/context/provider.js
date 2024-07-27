"use client"
import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [transaction, setTransaction] = useState({
        tShirt: 0,
        pants: 0,
        jeans: 0,
        short: 0,
        shirt: 0,
        price: '',
        startDate: '',
        endDate: ''
    })

    return (
        <AppContext.Provider value={{ transaction, setTransaction }}>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);