import React from 'react'
import { useContext, useState, createContext } from 'react'

const Context = createContext()

function ChefContext({children}) {
  const [chefClicked, setChefClicked]=useState("none")  
  return (
    <Context.Provider value={{chefClicked, setChefClicked}}>
        {children}
    </Context.Provider>
  )
}

export default ChefContext
export const useChefContext=()=>useContext(Context)