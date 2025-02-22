// import {  useState } from 'react'
// import reactLogo from './assets/react.svg'
import "../node_modules/flowbite/dist/flowbite.js"
import './App.css'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Products from './Component/Products/Products'
import Cart from './Component/Cart/Cart'
import Home from './Component/Home/Home'

import SigneUp from './Component/SigneUp/SigneUp'
import NotFound from './Component/NotFound/NotFound'
import Login from "./Component/Login/Login.jsx"
import Category from "./Component/Category/Category.jsx"
import Brands from "./Component/Brands/Brands.jsx"
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword.jsx"
import UpdatePassword from "./Component/UpdatePassword/UpdatePassword.jsx"
import ContextAuthProvider from "./ContextAuth/ContextAuth.jsx"
import ProtectedRouting from "./Component/ProtectedRouting.jsx"
import ProductDetails from "./Component/ProductDetails/ProductDetails.jsx"
import CartcontextProvider from "./ContextAuth/CartcontextProvider.jsx"
import  { Toaster } from 'react-hot-toast';
import ContextWishlistProvider from "./ContextAuth/ContextWishlistProvider.jsx"
import Whishlist from "./Component/Whishlist/Whishlist.jsx"
import Payment from "./Component/Payment/Payment.jsx"
import AllOrders from "./Component/Allorders/AllOrders.jsx"

function App() {
 let router= createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<ProtectedRouting><Home/></ProtectedRouting>},
      {path:'Cart',element:<ProtectedRouting><Cart/></ProtectedRouting>},
      {path:'ProductDetails/:id',element:<ProtectedRouting><ProductDetails/></ProtectedRouting>},
      {path:'products',element:<ProtectedRouting><Products/></ProtectedRouting>},
      {path:'category',element:<ProtectedRouting><Category/></ProtectedRouting>},
      {path:'brands',element:<ProtectedRouting><Brands/></ProtectedRouting>},
      {path:'wishlist',element:<ProtectedRouting><Whishlist/></ProtectedRouting>},
      {path:'Payment',element:<ProtectedRouting><Payment/></ProtectedRouting>},
      {path:'allorders',element:<ProtectedRouting><AllOrders/></ProtectedRouting>},
      {path:'SignUp',element:<SigneUp/>},
      {path:'login',element:<Login/>},
      {path:'forgetpassword',element:<ForgetPassword/>},
      {path:'updatPassword',element:<UpdatePassword/>},
      {path:'*',element:<NotFound/>},
    ]}
  ])

  return (
    <>
   <ContextWishlistProvider>
   <CartcontextProvider>
  <ContextAuthProvider>
    <RouterProvider router={router}>

    </RouterProvider>
  <Toaster/>
    </ContextAuthProvider>
  </CartcontextProvider>
   </ContextWishlistProvider>
    
   
 
   
    </>
  )
}

export default App
