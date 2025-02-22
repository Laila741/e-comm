import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export let cartContext=createContext()

export default function CartcontextProvider({children}) {
   const[cartId,setCartId]=useState(null)
    const [ cart, setCart ]= useState(0)
    useEffect(()=>{
      if (localStorage.getItem("token")){
        GetcartItem().then((respons)=>{
          setCart(respons?.data?.numOfCartItems)
        })
      }
    },[])
    function GetcartItem(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:{
        token:localStorage.getItem("token")
      }}).then((respons)=>{
        // setCart(respons.data.data.numOfCartItems)
           console.log(respons);
          setCartId(respons?.data?.cartId)
        return respons
      }).catch((error)=>error)
    }

    function removecartItem(id){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:{
        token:localStorage.getItem("token")
      }}).then((respons)=>{
        setCart(respons?.data?.numOfCartItems)
        return respons}).catch((error)=>error)
    }
    // function clearCart(){
    //   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:{
    //       token:localStorage.getItem("token")
    //   }})
    //   .then(response => {
    //       if (response?.data?.data?.message==="success"){
    //         setCart(0) 
            
    //       }
    //       console.log(response)
    //   })
    //   .catch(error => {
    //       console.error(error)
    //   })
    // }
    function updatecartItem(id,count){
      return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:count},{headers:{
        token:localStorage.getItem("token")
      }}).then((respons)=>{
        setCart(respons?.data?.numOfCartItems)
       return respons}).catch((error)=>error)
    }
    function ChangeCart(id){
      return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:id},
   {
      headers: {
        token:localStorage.getItem("token")
       }
  
    }).then((response)=>{
      // setCart(response.data.data.numOfCartItems)
    
      setCart(response?.data?.numOfCartItems)
      return response
      

    }).catch((error)=>{
         return error
    })}

  return (
    <>
    <cartContext.Provider value={{ChangeCart, GetcartItem,removecartItem,updatecartItem ,cart,setCart,cartId}}>
        {children}
    </cartContext.Provider>
    </>
  
  )
}

