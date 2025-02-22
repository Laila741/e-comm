import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { useState } from 'react'

export let WishlistContext=createContext()

export default function ContextWishlistProvider({children}) {
    const [wishlist, setWishlist] = useState(0)
    useEffect(()=>{
          if (localStorage.getItem("token")){
            GetWishlistItem().then((respons)=>{
              setWishlist(respons?.data?.data.length)
            })
          }
        },[])
        function GetWishlistItem(){
          return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:{
            token:localStorage.getItem("token")
          }}).then((respons)=>{
            // setCart(respons.data.data.numOfCartItems)
              console.log(respons.data)
            return respons
          }).catch((error)=>error)
        }
    function AddWhishlist(id){
        return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:id},
     {
        headers: {
          token:localStorage.getItem("token")
         }
    
      }).then((response)=>{
        // setCart(response.data.data.numOfCartItems)
        setWishlist(response?.data?.data.length)
        console.log(response?.data?.data.length)
        return response
        
  
      }).catch((error)=>{
           return error
      })}
      function removewishlistItem(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers:{
          token:localStorage.getItem("token")
        }}).then((respons)=>{
          setWishlist(respons?.data?.data.length)
        console.log(respons?.data?.data)
          return respons}).catch((error)=>error)
      }
  return (
    <WishlistContext.Provider value={{AddWhishlist,setWishlist,wishlist,GetWishlistItem,removewishlistItem}}>
        {children}
    </WishlistContext.Provider>
  )
}
