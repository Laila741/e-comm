
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup" 

export default function UpdatePassword() {
    let [errorMessage,setError]=useState(null)
    const baseUrl="https://ecommerce.routemisr.com";
    let navg =useNavigate();

    let validYup=Yup.object({
     
      email:Yup.string().required("email is required").email("enter valid email"),
     newPassword:Yup.string().required("newPassword is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"password invalid"),
      

    });
    let UpdatePasswordForm=useFormik({
        initialValues:{
      
          email:"",
          newPassword:"",
         
        },
       onSubmit: UpdatePasswordApi,
       validationSchema:validYup,
    });
    function UpdatePasswordApi(data){
        axios.put(`${baseUrl}/api/v1/auth/resetPassword`,data)
        .then((req)=>{
            console.log(req);
            if (req.data.token){
                navg("/")
            }
            
        }).catch((err)=>{
            setError(err.response.data.message);
        });
    }

  return (
    <>
    <h1 className="text-center p-7">UpdatePassword Now</h1>
    {
        errorMessage?(<div className="p-4  mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errorMessage}
      </div>):""
    }
    

<form onSubmit={UpdatePasswordForm.handleSubmit} className="w-7/12 mx-auto">


  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> email:</label>
    <input 
    value={UpdatePasswordForm.values.email}
    onChange={UpdatePasswordForm.handleChange}
    onBlur={UpdatePasswordForm.handleBlur}
    name='email'
    type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  {UpdatePasswordForm.touched.email && UpdatePasswordForm.errors?<p className="text-red-950">{UpdatePasswordForm.errors.email}</p>:""} 
  </div>
  
  <div className="mb-5">
    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> newPassword:</label>
    <input
     value={UpdatePasswordForm.values.newPassword}
     onChange={UpdatePasswordForm.handleChange}
     onBlur={UpdatePasswordForm.handleBlur} 
     name='newPassword' 
     type="password" id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  {UpdatePasswordForm.touched.newPassword && UpdatePasswordForm.errors?<p className="text-red-950">{UpdatePasswordForm.errors.newPassword}</p>:""} 
  </div>
  
  

 
  <button
  disabled={(!UpdatePasswordForm.isValid && UpdatePasswordForm.dirty)}
   type="submit" className="text-white bg-active  focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled: bg-opacity-35">Login</button>
</form>

    </>
  )
}