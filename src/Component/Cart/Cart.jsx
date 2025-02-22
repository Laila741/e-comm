import React, { useContext, useEffect } from 'react'
import { cartContext } from '../../ContextAuth/CartcontextProvider'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Cart() {
  // const [ cart, setCart ]= useState(0)
  // let {setCart}=useContext(cartContext)
  let [cartDetails,setCartdetails]=useState(null)
  let {GetcartItem,clearCart,removecartItem,updatecartItem}=useContext(cartContext)
    let [loading,setloading]=useState (true)
  async function GetCart(){
    let response=await GetcartItem();
    setloading(true)
    setCartdetails(response.data)
    setloading(false)
   
    
  }
  async function Updatecart(id,count){
    let response=await updatecartItem(id,count);
    setCartdetails(response.data)
    
  }
  async function DeleteCart(id){
    let response=await removecartItem(id);
    setCartdetails(response.data)
    
  }
  async function DeleteAllCart(){
    let response=await clearCart();
    setCartdetails(null)
    
  }


useEffect(()=>{
  GetCart();
 
},[]);

  return (
    <>
    {loading?<div className="flex justify-center items-center h-screen bg-slate-100">
       <span className="loader"></span>
       </div>:<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
         {cartDetails?.data.products.map((product)=><tr key={product._id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
          


          <td className="p-4">
              <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title}/>
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {product.product.title}
          </td>
          <td className="px-6 py-4">
              <div className="flex items-center">
                  <button onClick={()=>Updatecart(product.product._id,product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                      </svg>
                  </button>
                  <div>
                   <span>{product.count}</span>
                  </div>
                  <button onClick={()=>Updatecart(product.product._id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                      </svg>
                  </button>
              </div>
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
      {product.price} EGP
          </td>
          <td className="px-6 py-4">
            <i className='fa fa-trash text-red-600 pe-3 cursor-pointer' onClick={()=>DeleteCart(product.product._id)}></i>
              <a onClick={()=>DeleteCart(product.product._id)} href="#" className="font-semibold text-red-600 dark:text-red-500 hover:underline">Remove</a>
          </td>
        </tr>)}
          


           
            
        </tbody>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3 font-bold text-lg">
                   total price
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th scope="col" className="px-6 py-3 font-bold text-lg ">
                      {cartDetails?.data.totalCartPrice}
                </th>
               
            </tr>
        </thead>
    </table>
   
  <div className=' w-6/12 mx-auto flex justify-around py-5 items-center '>
  <button onClick={DeleteAllCart}className=' rounded bg-transparent border border-red-500 hover:bg-red-500 hover:text-white w-52  py-1 mt-3 text-red-500 font-bold duration-500 '>Delete All Cart</button>
  <Link to={"/Payment"} onClick={DeleteAllCart}className='block text-center rounded bg-transparent border border-active hover:bg-active hover:text-white w-52  py-1 mt-3 text-active font-bold duration-500 '> Payment Now</Link>
  </div>

</div>

}


    </>
  )
}
