import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';
import logo from '../assets/logo.png';
import { useNavigate } from "react-router";
import axios from 'axios';
import {toast} from 'react-toastify'
function Nav(Details) {
    const navigate=useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [user_name,setUserName]=useState("");
    useEffect(()=>{
        const authentication=async()=>{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/user/auth`,{withCredentials:true});
            if (res.data.message=='User Authenticated'){
                setUserName(res.data.user_name)
            }else{
                navigate('/login');
            }
        }
        authentication();
    },[navigate]);
    const handleClick=async()=>{
        const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/user/logout`,{},{withCredentials:true});
        if(res.data.message=="User Logged Out"){
            toast.success("Logged Out Successfully")
            navigate('/login');
        }
    }

    return (
    <>
        <nav className="nav-container">
            <div className="logo-container" onClick={() => navigate("/")}>
                <img src={logo} alt="logo" className="logo-img"/>
                <h1 className="logo">Insta Share</h1>
            </div>
            <div className={`nav-left ${!showMenu ?' hide':' appear'}`}>
                <ul className="nav-links">
                    <li className={Details.home ? `color`:''}><Link to='/'>Home</Link></li>
                    <li  className={Details.search ? `color`:''}><Link to='/search'>Search</Link></li>
                    <li className={Details.profile ? `color`:''}><Link to={`/profile/${user_name}`}>Profile</Link></li>
                </ul>
                <div className="util-cont">
                    <button className="btn nav-btn" onClick={()=>handleClick()}>{!user_name?"Login":"Logout"}</button>
                </div>
            </div>
            <div className='hamburger-icon' onClick={() => setShowMenu(!showMenu)}>
                <i className='bxr bx-menu'></i> 
            </div>
        </nav>
    </>
    )
}

export default Nav