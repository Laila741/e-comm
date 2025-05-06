import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { cartContext } from '../../ContextAuth/CartcontextProvider'
import { useNavigate } from 'react-router-dom'




export default function Payment() {
    let navg=useNavigate()
     
   let [cash,setCash]= useState(false)
    let {cartId}=useContext(cartContext)
    let Formpament=useFormik({
        initialValues:{
            details: "",
            phone: "",
            city: ""
        },
        onSubmit:paymentMethode
    })
    function paymentMethode(formValue){
        let apiObj={
            shippingAddress:formValue
        }
if (cash){
    HandelPayment(apiObj)
   
}else{
    onlinePayment(apiObj)
}
    }
   function onlinePayment(formValue){
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174`,formValue,{headers:{
        token:localStorage.getItem("token")
    }}).then((res)=>{

        window.open(res.data.session.url,"_self")
        console.log(res.data.session.url)
    }).catch((err)=>{
        console.log(err)
    })
   }
    function HandelPayment(formValue){
        console.log(formValue)
        
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,formValue,{
            headers:{
                token:localStorage.getItem("token")
            }
        }).then((res)=>{
            console.log(res)
            navg("/allorders")

        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <>
  
<div className='w-7/12 m-auto   my-10 px-10'>
<h1 className='font-bold mb-5 text-lg' >Payment Now</h1>
<form onSubmit={Formpament.handleSubmit} class=" mx-auto w-12/12">
  <div className="relative z-0 w-full mb-5 group">
      <input onChange={Formpament.handleChange} value={Formpament.values.details} onBlur={Formpament.handleBlur} type="text" name="details" id="floating_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-active focus:outline-none focus:ring-0 focus:border-active peer" placeholder=" " required />
      <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-active peer-focus:dark:text-active peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="tel"  onChange={Formpament.handleChange} value={Formpament.values.phone} onBlur={Formpament.handleBlur} name="phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-active focus:outline-none focus:ring-0 focus:border-active peer" placeholder=" " required />
      <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-active peer-focus:dark:text-active peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="text"  onChange={Formpament.handleChange} value={Formpament.values.city} onBlur={Formpament.handleBlur} name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-active focus:outline-none focus:ring-0 focus:border-active peer" placeholder=" " required />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-active peer-focus:dark:text-active peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
  </div>
  
 
    
  <button onClick={()=>{setCash(true)}} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active me-4">Cash Payment</button>
  <button onClick={()=>{setCash(false)}} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active ">Online Payment</button>
</form>
</div>


    </>
  )
}
