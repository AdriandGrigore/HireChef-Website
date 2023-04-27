import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../util/firebase-config";

function useAuth() {
    const [loggedInUser, setLoggedInUser] = useState({})
    
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setLoggedInUser(user)
            }
            else{
                setLoggedInUser(null)
            }
        })
    })

    return {
        loggedInUser
    }
}

export default useAuth