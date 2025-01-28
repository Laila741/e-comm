import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';



export default function Home() {
  const baseUrl="https://ecommerce.routemisr.com";
  let [AllProduct,SetAllProduct]=useState(null)
  let [numPage,setnumPage]=useState (null)
  let [loading,setloading]=useState (true)

  function GetALLproduct(page=1){
    setloading(true)
    axios.get(`${baseUrl}/api/v1/products?limit=25&page=${page}`).then((req)=>{
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
     <MainSlider/>
     <CategorySlider/>
    <div className="flex flex-wrap space-y-4">
    {AllProduct?.map((product)=>{
      return(
        
        <div key={product._id} className="lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3">
    
           <Link to={`/ProductDetails/${product._id}`}>
           <div className="item  group p-3 overflow-hidden hover:border hover:border-active">
               <img src={product.imageCover} alt={product.title} className="w-full" />
               <h5 className="text-active " >{product.category.name}</h5>
               <h2 > {product.title.split(" ").slice(0,2).join(" ")}</h2>
               <div className='flex justify-between'>
                 <span>{product.price}</span>
                 <span><i className='fa-solid fa-star text-yellow-500'></i>{product.ratingsAverage}</span>
               </div>
               <button className='btn duration-500 translate-y-44 group-hover:translate-y-0'>add to cart</button>
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
   {numPage?.map((el,i)=>{
    return(
      <li key={i} onClick={getpage}>
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
