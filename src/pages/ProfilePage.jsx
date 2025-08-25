import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem';
import '../styles/profilepage.css'
import Nav from '../components/Nav';
import ClipLoader from 'react-spinners/ClipLoader';
import Cookies from 'js-cookie';
import plus from '../assets/plus.png'
import { useNavigate } from "react-router";
function ProfilePage() {
    const navigate=useNavigate();
    const [profile,setProfile]=useState([]);
    const [loader,setLoader]=useState(false);
    useEffect(()=>{
        const getprofile=async()=>{
            setLoader(true)
            const res=await axios.get('http://localhost:3000/api/user/',{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials: true
            });
            setProfile(res.data.user);
            setLoader(false)
        }
        getprofile();
    },[]);
    return (
        <>
            <Nav profile={true} home={false} showSearch={false}/>
            <div className="profile-cont">
                <img className='prof-pic-lg' src={profile.profile_pic}/>
                <div className="profile-about">
                    <h1>{profile.user_name}</h1>
                    <div className="prof-connections">
                        <div className='prof-pic-user-cont'>
                            <img className='prof-pic-md' src={profile.profile_pic}/>
                        </div>
                        <div className="connections-wrappper">
                            <p>{profile.posts_count}</p>
                            <p>posts</p>
                        </div>
                        <div className="connections-wrappper">
                            <p>{profile.following_count}</p>
                            <p>following</p>
                        </div>
                        <div className="connections-wrappper">
                            <p>{profile.followers_count}</p>
                            <p>followers</p>
                        </div>
                    </div>
                    <div className="prof-info">
                        <p>{profile.user_name}</p>
                        <p>{profile.user_bio}</p>
                    </div>
                </div>
            </div>
            <div className="stories-container">
                {loader ? <ClipLoader/>:
                !profile.stories? ""
                :profile.stories.map(item=>
                    <div className='storie-cont' key={item.id}>
                        <div className="story" >
                            <img src={item.image} />
                        </div>
                    </div>
                    
                )}
                <div className='storie-cont' onClick={()=>{navigate('/upload-story')}}>
                    <div className="story" >
                        <img src={plus} />
                    </div>
                </div>
            </div>
            <div className="posts-container">
                <h1>#Posts</h1>
            </div>
            <div className="posts-container">
                {console.log(profile)}
                {loader ? <ClipLoader/>:
                !profile.posts?"No Post Yet":
                profile.posts.map(item=>
                    <img className="post" key={item.id} src={item.image} />
                )
                }
                <div className='postt-cont' onClick={()=>{navigate(`/uploadPost/${profile.user_id}`)}}>
                    <div className="ad-post" >
                        <img src={plus} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;