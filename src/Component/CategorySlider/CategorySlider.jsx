
import axios from 'axios'
import react, { useEffect, useState } from 'react'
import Slider from 'react-slick';
export default function CategorySlider() {
    const baseUrl="https://ecommerce.routemisr.com";
      let [AllCategory,SetAllCategory]=useState(null)
    //   let [loading,setloading]=useState (true)
      function GetALLCatrgory(){
        // setloading(true)
        axios.get(`${baseUrl}/api/v1/categories`).then((req)=>{
             SetAllCategory(req.data.data)
           
            
        }).catch((err)=>{
          console.log(err);
        }).finally(()=>{
        //   setloading(false)
        })
       
      }
       useEffect(()=>{
          GetALLCatrgory();
        },[])
        var settings = {
            dots: true,
            infinite: true,
            speed:500,
            slidesToShow: 6,
            slidesToScroll: 6,
            arrows:false,
            autoplay:true,
          };
  return (
    <div className="mb-7">

        <Slider {...settings}>
        {AllCategory?.map((category)=>{
            return(
                <div key={category._id}>
                
                            <img src={category.image} className="w-full h-48 object-cover" alt=""/>
                            <h5 className="text-center">{category.name}</h5>
                       
                </div>
            )
        })}
        </Slider>
    </div>
  )
}
