import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
export default function Category() {
  
    const baseUrl="https://ecommerce.routemisr.com";
    let [AllCategory,SetAllCategory]=useState(null)
    let [numPage,setnumPage]=useState (null)
    let [loading,setloading]=useState (true)
  
    function GetALLcategory(page=1){
      setloading(true)
      axios.get(`${baseUrl}/api/v1/categories?limit=15&page=${page}`).then((req)=>{
           SetAllCategory(req?.data?.data)
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
      GetALLcategory(page)
    }
   
   
   
    
    useEffect(()=>{
      GetALLcategory();
    },[])


    
        return (
              <>
     { loading? <div className="flex justify-center items-center h-screen bg-slate-100">
       <span className="loader"></span>
       </div>: <div className="w-11/12 my-5 mx-auto">
        <h1 className='text-center font-bold text-3xl pb-8  '>Our Categories</h1>
            <div className="flex flex-wrap  ">
        
            {AllCategory?.map((product)=>{
              return(
                <div key={product._id} className="  lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-9 ">
                     
                  <Link to={`/ProductDetails/${product._id}`}>
                  <div className="item shadow-md shadow-active rounded-md group p-3 overflow-hidden hover:border hover:border-active">
                      <img src={product.image} alt={product.title} className="w-full h-60 object-cover " />
                     <h2 className="text-active font-semibold"  >{product.name}</h2>
                      
                     
                      
                    </div>
                  </Link>
        
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
        <li onClick={getpage}>
        <a page={el} key={el}  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{el}</a>
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


