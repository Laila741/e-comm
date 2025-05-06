
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import { cartContext } from '../../ContextAuth/CartcontextProvider';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../ContextAuth/ContextWishlistProvider';

export default function Products() {
   let {ChangeCart}=useContext(cartContext)
   

    const baseUrl="https://ecommerce.routemisr.com";
    let [AllProduct,SetAllProduct]=useState(null)
    let [numPage,setnumPage]=useState (null)
    let [loading,setloading]=useState (true)
    
    async function  AddTowish(productid){
      let response=await AddWhishlist(productid)
     
      console.log(response)
 
      if (response?.data?.status==="success"){
      toast.success("product added to wishlist Successfly",)
       console.log(response)
      }else{
       toast.error("product not added to wishlist")
      }
     }
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
    function GetALLproduct(page=1){
      setloading(true)
      axios.get(`${baseUrl}/api/v1/products?limit=17&page=${page}`).then((req)=>{
           SetAllProduct(req.data.data)
           
           let num=[]
           for(let i=1;i<=req.data.metadata.numberOfPages;i++){
            num.push(i)
          }
  
          setnumPage(num)
       
          
      }).catch((err)=>{
        console.log(err);
      }).finally(()=>{
        setloading(false)
      })
     
    }
    function getpage(e){
  
      let page= e.target.getAttribute("page");
      GetALLproduct(page)
    }
   
   
   
    
    useEffect(()=>{
      GetALLproduct();
    },[])
    return (
      <>
     { loading? <div className="flex justify-center items-center h-screen bg-slate-100">
       <span className="loader"></span>
       </div>: <div className="w-11/12 my-5 mx-auto">
       <h1 className='text-center mb-5 font-semibold text-3xl'>Our Products</h1>
      <div className="flex flex-wrap ">
       
      {AllProduct?.map((product)=>{
        return(
          
          <div key={product._id} className="lg:w-2/12 md:w-3/12 group overflow-hidden sm:w-6/12 w-full px-3 mb-9">
      
             
             <div className="item shadow-md shadow-active rounded-md   p-3  hover:border hover:border-active">
             <Link to={`/ProductDetails/${product._id}`}>
                 <img src={product.imageCover} alt={product.title} className="w-full" /></Link>
                 <h5 className="text-active font-bold pb-2 " >{product.category.name}</h5>
                 <h2 className='font-bold pb-2' > {product.title.split(" ").slice(0,2).join(" ")}</h2>
                 <div className='flex justify-between'>
                   <span className='font-md text-gray-500 py-2'>{product.price} EGP</span>
                   <span onClick={()=>AddTowish(product._id)} className='py-2'> <i className='fa-solid fa-heart me-1 text-red-500 text-end'></i><i className='fa-solid fa-star text-yellow-500 ps-2'></i>{product.ratingsAverage}</span>
                 </div>
                
                 
              </div>
              
  
             
             <button onClick={()=>AddToCard(product._id)} className='btn duration-500 translate-y-44 group-hover:translate-y-0'>add to cart</button>
          </div>
        )
      })}
  
        </div>
        
  
  <nav aria-label="Page navigation  example   " className="m-4 text-center" >
    <ul className="inline-flex  -space-x-px text-sm">
      <li>
        <a  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-active bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
      </li>
     {numPage?.map((el)=>{
      return(
        <li key={el}  onClick={getpage}>
        <a page={el}  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{el}</a>
      </li>
      )
     })}
      
      <li>
        <a  className="flex items-center justify-center px-3 h-8 leading-tight text-active bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
      </li>
    </ul>
  </nav>
  
  
  
      </div>}
      </>
       
     
    
    )
  
}
