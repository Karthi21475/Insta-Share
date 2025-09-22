import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import logo from '../assets/logo.png';
import loginImage from '../assets/login.png';
import { useNavigate } from "react-router";
function Signin() {
  const navigate=useNavigate();
  const [show,setShow]=useState(false);
  const [error,setError]=useState("");
  return (
    <>
      <div className="form-container">
        <img className='loginImage' src={loginImage} alt="Login" />
        <form onSubmit={
          async(e)=>{
          e.preventDefault();
          const username = e.target.username.value;
          const email = e.target.email.value;
          const password =e.target.password.value;
          const formData = {username,email,password};
          try{
            const res=await axios.post('http://localhost:3000/api/user/signup',formData,{
              headers:{
                'Content-Type':'application/json'
              },
              withCredentials: true
            });
            if(res.data.message==="User Created"){
              navigate('/login');
            }
          }catch(err){
              setError(err.response.data.message);
          }
        }}>
          <div className='logo-cont'>
            <img src={logo} alt="Logo" onClick={() => navigate("/")}/>
            <h1>Sign Up</h1>
          </div>

          <label htmlFor="username" >Username</label>
          <input type="text" id="username" name="username" placeholder="Username" required/>

          <label htmlFor="email" >Email</label>
          <input type="text" id="email" name="email" placeholder="Email" required/>

          <label htmlFor='password'>Password</label>
          <div className="input-cont">
            <input type={show ? "text":"password"} name="password" id="password" placeholder="Password" required/>
            <p onClick={()=>{setShow(!show)}} htmlFor='password' >{!show?'Show':"Hide"}</p>
          </div>
          {error.length>0 && <p className="error">{error}</p>}
          <button type='submit' className="btn">Sign Up</button>
          <p>Already have an account?<Link to="/login" className="navigateLink">Log in</Link></p>
        </form>
      </div>
    </>
  )
}

export default Signin