
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup" 

export default function ForgetPassword() {
    let [errorMessage,setError]=useState(null)
    let [FormDisplay,setFormDisplay]=useState(true)

    const baseUrl="https://ecommerce.routemisr.com";
    let navg =useNavigate();
     let validYup=Yup.object({
     
          email:Yup.string().required("email is required").email("enter valid email"),
         });
    let valid2Yup=Yup.object({
    
      resetCode:Yup.string().required("resetcode is required"),
      
    });
    let forgetPasswordForm=useFormik({
        initialValues:{
      
          email:"",
       
         
        },
       onSubmit: ForgetPasswordApi,
       validationSchema:validYup,
    });
    let verifyPasswordForm=useFormik({
      initialValues:{
        resetCode:"",
      },
     onSubmit: VerifyPasswordApi,
     validationSchema:valid2Yup,
  });
 
    function ForgetPasswordApi(data){
        axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`,data)
        .then((req)=>{
            console.log(req);
            if (req.data.statusMsg=="success"){
               setFormDisplay(false)
            }
            
        }).catch((err)=>{
            setError(err.response.data.message);
        });
    }
    function VerifyPasswordApi(data){
      axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`,data)
      .then((req)=>{
          console.log(req);
          if (req.data.status=="Success"){
             navg("/updatPassword")
          }
          
      }).catch((err)=>{
          setError(err.response.data.message);
      });
  }
  

  return (

    <>
    {FormDisplay?<div>
       <h1 className="text-center p-7">ForgetPassword </h1>
        {
         errorMessage?(<div className="p-4  mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
         {errorMessage}
       </div>):""
     }
      <form onSubmit={forgetPasswordForm.handleSubmit} className="w-7/12 mx-auto">
      <div className="mb-5">
       <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> email:</label>
      <input 
      value={forgetPasswordForm
  .values.email}
      onChange={forgetPasswordForm
  .handleChange}
      onBlur={forgetPasswordForm
  .handleBlur}
      name='email'
      type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    
      {forgetPasswordForm.touched.email && forgetPasswordForm.errors?<p className="text-red-950">{forgetPasswordForm.errors.email}</p>:""} 
    </div>
  <button
    disabled={ (!forgetPasswordForm.isValid && forgetPasswordForm.dirty)}
    type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled: bg-opacity-35">ConfirmPassword</button>
  </form>
 </div>: <div>
       <h1 className="text-center p-7">resetPassword </h1>
        {
         errorMessage?(<div className="p-4  mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
         {errorMessage}
       </div>):""
     }
      <form onSubmit={verifyPasswordForm.handleSubmit} className="w-7/12 mx-auto">
      <div className="mb-5">
       <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> resetCode:</label>
      <input 
      value={verifyPasswordForm
  .values.resetCode}
      onChange={verifyPasswordForm
  .handleChange}
      onBlur={verifyPasswordForm
  .handleBlur}
      name='resetCode'
      type="string" id="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    
      {verifyPasswordForm.touched.resetCode && verifyPasswordForm.errors?<p className="text-red-950">{verifyPasswordForm.errors.resetCode}</p>:""} 
    </div>
  <button
    disabled={ (!verifyPasswordForm.isValid && verifyPasswordForm.dirty)}
    type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled: bg-opacity-35">ConfirmPassword</button>
  </form>
 </div>}
    





    </>
    

  )
}
