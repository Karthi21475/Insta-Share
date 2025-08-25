import React,{ useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../styles/login.css';
import logo from '../assets/logo.png';
import ClipLoader from 'react-spinners/ClipLoader';
import loginImage from '../assets/login.png';
import Cookie from 'js-cookie'
import { useNavigate } from "react-router";
function Login() {
  const navigate=useNavigate();
  const [show,setshow]=useState(false);
  const [loader,setLoader]=useState(false);
  const [error,setError]=useState(false);
    return (
        <>
          <div className="form-container">
              <img className='loginImage' src={loginImage} alt="Login" />
              <form onSubmit={
                async(e)=>{
                  setLoader(true)
                  e.preventDefault();
                  const username = e.target.username.value;
                  const password =e.target.password.value;
                  const formData = {username,password};
                  try{
                    const res=await axios.post('http://localhost:3000/api/user/login',formData,{
                      headers:{
                        'Content-Type':'application/json'
                      },
                      withCredentials: true
                    })
                    if (res.data.message==="Login Success"){
                      Cookie.set(
                        'token',
                        res.data.jwt_token,
                        {path:'/', 
                        expires:7});
                      navigate("/");
                    }
                  }catch(err){
                    if(err.response.data.message==="user does not exist"){
                      navigate("/signup");
                    }
                    else if(err.response.data.message==="Incorrect Password"){
                      setError(true);
                    }
                  }
                  setLoader(false)
              }}>
                <div className="logo-cont">
                  <img src={logo} alt="Logo" onClick={() => navigate("/")}/>
                  <h1>Insta Share</h1>
                </div>
                  <label htmlFor="username" >Username</label>
                  <input type="text" id="username" name="username" placeholder=" " required/>
                  <label htmlFor='password'>Password</label>
                <div className="input-cont">
                  <input type={show ? "text":"password"} name="password" id="password" placeholder=" " required/>
                  <p onClick={()=>{setshow(!show)}} htmlFor='password' >{!show?'Show':"Hide"}</p>
                </div>
                {error && <p className="error">Incorrect Password</p>}
                {loader?
                <button className="btn">
                  <ClipLoader />
                </button>:
                <button className="btn">Login</button>}
                
                <p>Dont have an account yet?<Link to="/signup" className="navigateLink">Sign up?</Link></p>
              </form>
          </div>
        </>
    )
}

export default Login