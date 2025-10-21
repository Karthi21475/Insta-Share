import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../styles/login.css';
import logo from '../assets/logo.png';
import ClipLoader from 'react-spinners/ClipLoader';
import loginImage from '../assets/login.png';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
function Login() {
  const navigate=useNavigate();
  const [show,setshow]=useState(false);
  const [loader,setLoader]=useState(false);
  const [error,setError]=useState("");
    return (
        <>
          <div className="form-container">
              <img className='loginImage' src={loginImage} alt="Login" />
              <form onSubmit={
                async(e)=>{
                  setLoader(true);
                  setError("");
                  e.preventDefault();
                  const username = e.target.username.value;
                  const password =e.target.password.value;
                  const formData = {username,password};
                  try{
                    const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`,formData,{
                      headers:{
                        'Content-Type':'application/json'
                      },
                      withCredentials: true
                    })
                    if (res.data.message==="Login Success"){
                          navigate("/");
                        }
                      }catch(err){
                        if(err.response.data.message==="user does not exist"){
                          navigate("/signup");
                        }
                        toast.error(err.response.data.message);
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
                {error.length>0 && <p className="error">{error}</p>}
                <button className="btn">
                {loader?<ClipLoader />:"Login"}</button>
                <p>Dont have an account yet?<Link to="/signup" className="navigateLink">Sign up</Link></p>
              </form>
          </div>
        </>
    )
}

export default Login