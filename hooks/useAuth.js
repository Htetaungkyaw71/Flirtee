import { signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from "../firebase"



const AuthContext = createContext({})


export const AuthProvider = ({children}) => {
  let [user,setUser] = useState(null);
  let [loadingInitial,setLoadingInitial] = useState(true)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
      if(user){
        setUser(user)
      }else{
        setUser(null)
      }
    })
    setLoadingInitial(false)
    return unsubscribe
  },[])

 


const logOut = ()=>{
    signOut(auth).catch(error => alert(error.message));
  }


  return (
    <AuthContext.Provider value={{user,logOut}}>
        {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default useAuth = () => {
    return useContext(AuthContext)
}

