
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';
import Products from '../Products/Products';
import { cartContext } from '../../ContextAuth/CartcontextProvider';
import toast from 'react-hot-toast';

export default function ProductDetails() {
     let {ChangeCart}=useContext(cartContext)
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
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
      };
    const baseUrl="https://ecommerce.routemisr.com";
      let [Product,setProduct]=useState(null)
    
    let {id}=useParams()
    function getProductDetails(id){
        axios.get(`${baseUrl}/api/v1/products/${id}`).then((req)=>{
            setProduct(req.data.data)
          
       })

    }
    useEffect(()=>{
       getProductDetails(id);
      },[id])
  return (
    <>
   <div className="w-10/12 mx-auto my-5">
   <div className='flex justify-between items-center'>
        <div className='w-3/12'>
        
       < Slider {...settings}>
       {Product?.images.map((image, index) => {
        return (
            <div key={index}>
                  <img src={image} className='w-full' alt="" />
            </div>
        )
       })}
       </Slider>

        </div>
        <div className='w-8/12'>
        <h3>{Product?.title}</h3>
        <p className='text-gray-400 my-5'>{Product?.description}</p>
        <div className='flex justify-between'>
                 <span>{Product?.price}</span>
                 <span><i className='fa-solid fa-star text-yellow-500'></i>{Product?.ratingsAverage}</span>
               </div>
               <button onClick={()=>AddToCard(Product._id)}className='btn duration-500 '>add to cart</button>
        </div>
        </div>
           


           
   </div>
   <h1 className='text-center font-bold py-10 text-3xl text-active uppercase '> Another product </h1>
        <Products/>
        
        </>
  )
}
