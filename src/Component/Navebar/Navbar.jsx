import React, { useState } from 'react'
import logoImage from "../../assets/images/freshcart-logo.svg"
import "flowbite/dist/flowbite.js"
import { Link,NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../ContextAuth/ContextAuth'
import { cartContext } from '../../ContextAuth/CartcontextProvider'
import { WishlistContext } from '../../ContextAuth/ContextWishlistProvider'

export default function Navbar() {
    // let {GetcartItem ,removecartItem,updatecartItem}=useContext(cartContext)
  let {cart}=useContext(cartContext)
  let {wishlist}=useContext(WishlistContext)
  let {Token,setToken,user}=useContext(AuthContext);
  console.log(user);
  
  let navg=useNavigate();
  function Logout(){
    localStorage.removeItem("token");
    setToken(null)
    navg("/login")
  }
  return (
    <>
<nav className="bg-white fixed top-0  w-full z-50 border-gray-200  shadow">
  <div className="max-w-screen-xl flex  flex-wrap justify-between items-center mx-auto p-4  ">
  <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={logoImage} className="h-8 mx-3 " alt="FreachCart" />
      
  </Link>
  <div className="flex md:order-2 ">
   
  
    <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
      
    <i className="fa-solid fa-bars"></i>
       
    </button>
   
  </div>
    <div className="items-center w-full  bg-white justify-between hidden  md:flex md:w-auto md:order-1" id="navbar-search">
      
      {Token?<ul className="flex flex-col p-4 w-12/12 md:w-4/12  md:p-0 mt-4 font-medium border  border-gray-100 rounded-lg  md:space-x-3 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
        <li>
          <NavLink
           to="/" className="block py-2 px-3  bg-green-700 rounded md:bg-transparent  md:p-0 text-gray-900 font-semibold" aria-current="page">Home</NavLink>
        </li>
        <li>
          <NavLink
           to="/products" className="block py-2 px-3 text-gray-900 rounded   md:p-0 md:dark:hover:text-green-500 font-semibold  md:dark:hover:bg-transparent dark:border-gray-700">Products</NavLink>
        </li>
        <li>
          <NavLink
           to="/Cart"className="block py-2 px-3 text-gray-900 rounded   md:p-0 font-semibold  md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cart</NavLink>
          
        </li>
         <li>
          <NavLink
           to="/brands"className="block py-2 px-3 text-gray-900 rounded font-semibold  md:p-0  md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Brands</NavLink>
          
          
        </li>
        <li>
          <NavLink
           to="/category"className="block py-2 px-3 text-gray-900 rounded font-semibold  md:p-0  md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Category</NavLink>
          
          
        </li>
        
      </ul>:""}


       <ul  className="flex ms-auto w-12/12 md:w-4/12 flex-col p-4 md:p-0 v items-center  mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
        <li className='flex flex-row justify-between items-center  md:flex-row'>
        <i className="fa-brands fa-facebook p-3"></i>
        <i className="fa-brands fa-twitter p-3"></i>
        <i className="fa-brands fa-github p-3"></i>
        <i className="fa-brands fa-linkedin p-3"></i>
        </li>
       
       
        
        {Token?<>
        <li className="flex flex-row justify-between items-center  md:flex-row">
        <div className='relative '>
          <Link to ="/wishlist"><i className="fa-solid fa-heart pe-5 text-red-500"></i></Link>
          <span className=' absolute -top-4 left-3 text-red-500 '>{wishlist}</span>
          </div>
          <div className='relative '>
          <Link to ="/cart"><i className="fa-solid fa-cart-shopping pe-5 text-active"></i></Link>
          <span className=' absolute -top-4 left-3 text-active '>{cart}</span>
          </div>
         
        
          <i onClick={Logout} className="fa-solid fa-arrow-right-from-bracket text-red-700 cursor-pointer"></i> 
          <Link to ="/login" onClick={Logout}className=" font-semibold p-2  ">Logout</Link>
         
        
        </li>
        </>:<><li className=' shadow px-3 py-2 my-2 rounded-md drop-shadow-md shadow-gray-200 bg-active '>
          <Link to="/SignUp"className="block py-2 px-3  text-white rounded  
           md:p-0  md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">SignUP</Link>
        </li>
        <li  className=' shadow px-3 py-2 rounded-md drop-shadow-md shadow-gray-200 bg-active '>
          <Link to="/login"className="block py-2 px-3 text-white rounded  
           md:p-0  md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
        </li></>}
        
        
      

      </ul>
  
    </div>
  </div>
</nav>

 </>
  )
}
