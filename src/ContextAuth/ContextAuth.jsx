import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'
import { data } from 'react-router-dom';
export let AuthContext=createContext();
export default function ContextAuthProvider({children}) {
    let [Token, setToken]=useState(null);
    let [user, setUser]=useState(null)
    useEffect(()=>{
        let tokenStorage=localStorage.getItem("token")
        if(localStorage.getItem("token")){
           setToken(tokenStorage)
           jwtDecodeData(tokenStorage);
        }
    },[])
    function jwtDecodeData(x){
        if(Token!=null){
            let dataDecode=jwtDecode(x);
            console.log(dataDecode);
            setUser(dataDecode)
        }
       
        
    }
  return (
    <AuthContext.Provider value={{Token,setToken,user,jwtDecodeData}}>{children}</AuthContext.Provider>
  )
}
