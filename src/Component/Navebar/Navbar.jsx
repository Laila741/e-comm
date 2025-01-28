import React from 'react'
import logoImage from "../../assets/images/freshcart-logo.svg"
import "flowbite/dist/flowbite.js"
import { Link,NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../ContextAuth/ContextAuth'
export default function Navbar() {
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
<nav className="bg-white border-gray-200  shadow">
  <div className="max-w-screen-xl flex  flex-wrap justify-between items-center mx-auto p-4  ">
  <Link to=" " className="flex items-center space-x-3 rtl:space-x-reverse">
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
           to="/" className="block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent  md:p-0 active" aria-current="page">Home</NavLink>
        </li>
        <li>
          <NavLink
           to="/products" className="block py-2 px-3 text-gray-900 rounded   md:p-0 md:dark:hover:text-green-500  md:dark:hover:bg-transparent dark:border-gray-700">Products</NavLink>
        </li>
        <li>
          <NavLink
           to="/Cart"className="block py-2 px-3 text-gray-900 rounded   md:p-0  md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cart</NavLink>
          
        </li>
         <li>
          <NavLink
           to="/brands"className="block py-2 px-3 text-gray-900 rounded   md:p-0  md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Brands</NavLink>
          
          
        </li>
        <li>
          <NavLink
           to="/category"className="block py-2 px-3 text-gray-900 rounded   md:p-0  md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Category</NavLink>
          
          
        </li>
        
      </ul>:""}


       <ul  className="flex ms-auto w-12/12 md:w-4/12 flex-col p-4 md:p-0  mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
        <li>
        <i className="fa-brands fa-facebook"></i>
        </li>
        <li>
         <i className="fa-brands fa-twitter"></i>
        </li>
        <li>
         <i className="fa-brands fa-github"></i>
        </li>
        <li>
        <i className="fa-brands fa-linkedin"></i>
        </li>
        {Token?<><li>
        <Link to ="/login" onClick={Logout}className=" rounded-full bg-active p-2  ">Logout</Link>
        
        </li>
        <li>
          
          <span >Hello {user?.name}</span></li></>:<><li>
          <Link to="/SignUp"className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0  md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">SignUP</Link>
        </li>
        <li>
          <Link to="/login"className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0  md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</Link>
        </li></>}
        
        
      

      </ul>
  
    </div>
  </div>
</nav>

 </>
  )
}
