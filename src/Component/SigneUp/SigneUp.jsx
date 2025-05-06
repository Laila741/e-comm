
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup" 
export default function SigneUp() {
    let [errorMessage,setError]=useState(null)
    const baseUrl="https://ecommerce.routemisr.com";
    let navg =useNavigate();
let[subload,setSubload]=useState(false)
    let validYup=Yup.object({
      name:Yup.string().required("name required").min(3,"min char3").max(8,"max char 8 "),
      email:Yup.string().required("email is required").email("enter valid email"),
      password:Yup.string().required("password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"password invalid"),
      rePassword:Yup.string().required("rePassword is required").oneOf([Yup.ref('password')],"repassword not valid"),
      phone:Yup.string().required("phone required").matches(/^(20)?01[1052][0-9]{8}$/)

    });
    let regiserForm=useFormik({
        initialValues:{
          name:"",
          email:"",
          password:"",
          rePassword:"",
          phone:"",
        },
       onSubmit: RegisterApi,
       validationSchema:validYup,
    });
    function RegisterApi(data){
      setSubload(false)
        axios.post(`${baseUrl}/api/v1/auth/signup`,data)
        .then((req)=>{
            console.log(req);
            if (req.data.message=="success"){
                navg("/login")
            }
            
        }).catch((err)=>{
            setError(err.response.data.message);
            setSubload(true)
        });
    }

  return (
    <>

    <h1 className="text-center p-7 font-bold text-3xl ">Register Now</h1>
    <div className='w-8/12 m-auto rounded-md drop-shadow-md shadow-active shadow p-10 mb-12'>
    {
        errorMessage?(<div className="p-4  mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errorMessage}
      </div>):""
    }
    <form onSubmit={regiserForm.handleSubmit} className="w-full mx-auto">
<div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm  font-semibold text-gray-900 dark:text-white"> name:</label>
    <input 
    value={regiserForm.values.name}
    onChange={regiserForm.handleChange}
    onBlur={regiserForm.handleBlur}
    name='name'
    type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    {regiserForm.touched.email && regiserForm.errors?<p className="text-red-950">{regiserForm.errors.email}</p>:""} 
  </div>

  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm  font-semibold text-gray-900 dark:text-white"> email:</label>
    <input 
    value={regiserForm.values.email}
    onChange={regiserForm.handleChange}
    onBlur={regiserForm.handleBlur}
    name='email'
    type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
   {regiserForm.touched.email && regiserForm.errors?<p className="text-red-950">{regiserForm.errors.email}</p>:""} 
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm  font-semibold text-gray-900 dark:text-white"> password:</label>
    <input
     value={regiserForm.values.password}
     onChange={regiserForm.handleChange}
     onBlur={regiserForm.handleBlur} 
     name='password' 
     type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
   {regiserForm.touched.email && regiserForm.errors?<p className="text-red-950">{regiserForm.errors.email}</p>:""} 
  </div>
  <div className="mb-5">
    <label htmlFor="rePassword" className="block mb-2 text-sm  font-semibold text-gray-900 dark:text-white"> rePassword:</label>
    <input
     value={regiserForm.values.rePassword}
     onChange={regiserForm.handleChange}
     onBlur={regiserForm.handleBlur} 
     name='rePassword' type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  {regiserForm.touched.email && regiserForm.errors?<p className="text-red-950">{regiserForm.errors.email}</p>:""} 
  </div>
  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm  font-semibold text-gray-900 dark:text-white"> phone:</label>
    <input
     value={regiserForm.values.phone}
     onChange={regiserForm.handleChange}
     onBlur={regiserForm.handleBlur} 
     name='phone' type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
   {regiserForm.touched.email && regiserForm.errors?<p className="text-red-950">{regiserForm.errors.email}</p>:""} 
  </div>
 
  <button
  disabled={(!regiserForm.isValid && regiserForm.dirty)}
  type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled: bg-opacity-35">Login</button>
  {/* <button
 type="submit" className="text-white bg-active  focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active "> {subload?<i className='fas fa-spinner fa-spin'></i>:"Register" }</button> */}
<br />

</form>
    </div>
    
    


    </>
  )
}
