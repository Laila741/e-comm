import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export default function AllOrders() {
    
     let userId =jwtDecode(localStorage.getItem('token'))
          console.log(userId.id)
        
     let [orders, setOrders]=useState([])
     function getUserOrder(){
        axios .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId.id}`).then((res)=>{
            
            console.log(res?.data)
            setOrders(res?.data)
          
        }).catch((err)=>{
            console.log(err)
        })
     }
     useEffect(()=>{
      getUserOrder()
     },[])
  return (
    <>
   {orders.map((order,index)=> (
    <div
    key={index} className='container mx-auto p-6 rounded my-6 border-gray-300 border-2 border-dotted'
    >
      <div className=' flex flex-col md:justify-between md:items-center md:flex-row mb-10 border-b-2 pb-3 border-dotted'>
        <h1 className='text-lg text-gray-600'>
          <span className='font-semibold text-block'>Transaction Number :</span>#{order.id}
        </h1>
        <p className='text-lg text-gray-600'>
        <span className='font-semibold text-block'> Placed on :</span>{new Date(order.createdAt).toLocaleString()}
        </p>
        <p className='text-lg text-gray-600'>
        <span className='font-semibold text-block'> Payment  :</span>{ order.paymentMethodType}
        </p>
      </div>
      <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        {order?.cartItems?.map((product,i)=>(
          <div className='flex items-center spacex-4 p-4'>
            <img src={product.product.imageCover} alt={product.product.title} className='w-20 h-20 object-cover rounded'/>
            <div >
              <h2 className='text-xl font-medium'>
                {product.product.title.split(" ").slice(0.2).join(" ")}
              </h2>
              <p className='text-active'>
                <span className='font-semibold text-black'>Price :</span>{" "}
                {product.price}{" "}EGP
              </p>
              <p className='text-active'>
                <span className='font-semibold text-black'>Quntity :</span>{" "}
                {product.count}
              </p>
              <p className='text-gray-600'>
               
                {product.product.category.name}
              </p>
              <p className='text-gray-600'>
               
                {product.product.brand.name}
              </p>
            </div>

          </div>
         
        ))}
      </div>
      <div className='mb-4'>
       <p className=' text-lg text-gray-600'>
          <span className='font-semibold text-block'>
           Product  Quantity: {" "}
          </span>
          {order?.cartItems?.reduce((total,items)=> total+items.count,0)}
       </p>
       <p className=' text-lg text-active '>
        <span className=' font-semibold text-block'>
          Shipping price :{" "}
        </span>
        {order.shippingPrice} EGP
       </p>
       <p className=' text-lg text-active '>
        <span className=' font-semibold text-block'>
          taxPrice :{" "}
        </span>
        {order.taxPrice} EGP
       </p>
       <p className=' text-lg text-active '>
        <span className=' font-semibold text-block'>
          Ttal order Price :{" "}
        </span>
        {order.totalOrderPrice + order.taxPrice} EGP
       </p>
      </div>
    </div>
   ))}








      
    </>
   
  )
}
