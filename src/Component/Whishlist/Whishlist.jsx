import React, { useContext, useEffect, useState } from 'react'
import { WishlistContext } from '../../ContextAuth/ContextWishlistProvider'
import { Link } from 'react-router-dom'
import { cartContext } from '../../ContextAuth/CartcontextProvider'
import toast from 'react-hot-toast';
export default function Whishlist() {
  let [carWtDetails,setCartWdetails]=useState([])
  let {GetWishlistItem,removewishlistItem}=useContext(WishlistContext)
  let {ChangeCart}=useContext(cartContext)
  let [loading,setloading]=useState (true)
  async function  AddToCard(productid){
    let response=await ChangeCart(productid)
   
    console.log(response)

    if (response?.data?.status==="success"){
    toast.success("product added to cart Successfly",)
     console.log(response)
    }else{
     toast.error("product not added to cart")
    }
   }
  
  async function GetCartWishlist(){
    setloading(true)
    let response=await GetWishlistItem();
    setCartWdetails(response.data)
    setloading(false)
    console.log( response.data);
  }
  
  async function DeleteCart(id){
    let response=await removewishlistItem(id);
    setCartWdetails(response.data)
    GetCartWishlist()
    
  }
  useEffect(()=>{
    GetCartWishlist()
  },[])
  return (
    <>
    <h2 className='text-3xl font-bold py-5 text-center'>My WishList</h2>
    {loading?<div className="flex justify-center items-center h-screen bg-slate-100">
       <span className="loader"></span>
       </div>:<div className="flex flex-wrap ">
      {carWtDetails?.data?.map((product)=>{
        return(
          
          <div key={product._id} className="lg:w-2/12 md:w-3/12 group overflow-hidden sm:w-6/12 w-full px-3 mb-9">
      
             <Link to={`/ProductDetails/${product._id}`}>
             <div className="item shadow-md shadow-active rounded-md   p-3  hover:border hover:border-active">
                 <img src={product.imageCover} alt={product.title} className="w-full" />
               
                 
                 <div className='flex justify-between'>
                   <span className='font-semibold py-2'>{product.price} EGP</span>
                   <span onClick={()=>AddTowish(product._id)} className='py-2'> <i className='fa-solid fa-heart me-1 text-red-500 text-end'></i><i className='fa-solid fa-star text-yellow-500'></i>{product.ratingsAverage}</span>
                 </div>
                
                 
              </div>
              
  
             </Link>
             <button onClick={()=>AddToCard(product._id)} className='btn duration-500 translate-y-44 group-hover:translate-y-0'>add to cart</button>
             <button onClick={()=>DeleteCart(product._id)}className='w-full rounded-md py-1 mt-3 bg-red-500 duration-500 translate-y-44 group-hover:translate-y-0'>Deleat from wishlist</button>
          
          </div>
        )
      })}
  
        </div>}
     </>
   
  )
}
