import axios from 'axios'
import React, { useContext, useState } from 'react'

import { jwtDecode } from 'jwt-decode'

export default function AllOrders() {
    
     let {userId }=jwtDecode(localStorage.getItem('token'))
   
         console.log(userId)
     let [orders, setOrders]=useState([])
     function getUserOrder(){
        axios .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`).then((res)=>{
            setOrders(res.data)
          console.log (res)
        }).catch((err)=>{
            console.log(err)
        })
     }
     getUserOrder()
  return (
    <div>AllOrders</div>
  )
}
