import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/Nav.css';
import logo from '../assets/logo.png';
function Nav(Details) {
    const [token,settoken]=useState(false);
    const [showMenu, setShowMenu] = useState(false);
    useEffect(()=>{
        const authchecker=async()=>{
            if(Cookies.get('token')){
                settoken(true);
            }
            else{
                window.location.href='/login';
                Cookies.remove('token');
                settoken(false);
            }
        }
        authchecker();
    },[token]);
    const handleClick=async()=>{
        Cookies.remove('token')
        settoken(false);
    }

    return (
    <>
        <nav className="nav-container">
            <div className="logo-container">
                <img src={logo} alt="logo" className="logo-img"/>
                <h1 className="logo">Insta Share</h1>
            </div>
            <div className={`nav-left ${!showMenu ?' hide':' appear'}`}>
                {
                    Details.showSearch && 
                    <div className='search-container'>
                        <input type="text" value={Details.searchTerm} onChange={(e)=>{
                            Details.setSearchTerm(e.target.value);
                        }} placeholder="Search..." />
                        <div className='search-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width='15' height='15' viewBox="0 0 50 50">
                                <path d="M 21 3 C 11.622998 3 4 10.623005 4 20 C 4 29.376995 11.622998 37 21 37 C 24.712383 37 28.139151 35.791079 30.9375 33.765625 L 44.085938 46.914062 L 46.914062 44.085938 L 33.886719 31.058594 C 36.443536 28.083 38 24.223631 38 20 C 38 10.623005 30.377002 3 21 3 z M 21 5 C 29.296122 5 36 11.703883 36 20 C 36 28.296117 29.296122 35 21 35 C 12.703878 35 6 28.296117 6 20 C 6 11.703883 12.703878 5 21 5 z"></path>
                            </svg>
                        </div>
                    </div>
                }
                <ul className="nav-links">
                    <li className={Details.home ? `color`:''}><Link to='/'>Home</Link></li>
                    <li  className={Details.search ? `color`:''}><Link to='/search'>Search</Link></li>
                    <li className={Details.profile ? `color`:''}><Link to='/profile'>Profile</Link></li>
                </ul>
                <div className="util-cont">
                    <button className="btn nav-btn" onClick={()=>handleClick()}>Logout</button>
                </div>
            </div>
            <div className='hamburger-icon' onClick={() => setShowMenu(!showMenu)}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                    <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                </svg>
            </div>
        </nav>
    </>
    )
}

export default Nav