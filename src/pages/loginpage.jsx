import React,{ useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../styles/login.css';
import logo from '../assets/logo.png';
import ClipLoader from 'react-spinners/ClipLoader';
import loginImage from '../assets/login.png';
function Login() {
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
                    const res=await axios.post("/api",formData,{
                      headers:{
                        'Content-Type':'application/json'
                      },
                      withCredentials: true
                    })
                    if (res.data.jwt_token){
                      document.cookie = `token=${res.data.jwt_token}; path=/; max-age=604800`;
                      window.location.href="/";
                    }
                  }catch(err){
                    if(err.response.data.error_msg==="invalid username"){
                      window.location.href="/signup";
                    }
                    else if(err.response.data.error_msg==="username and password didn't match"){
                      setError(true);
                    }
                  }
                  setLoader(false)
              }}>
                <div className="logo-cont">
                  <img src={logo} alt="Logo" onClick={() => window.location.href="/"}/>
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