import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem';
import '../styles/profilepage.css'
import Nav from '../components/Nav';
import ClipLoader from 'react-spinners/ClipLoader';
import Cookies from 'js-cookie';
function ProfilePage() {

    const [profile,setProfile]=useState([]);
    const [loader,setLoader]=useState(false);
    useEffect(()=>{
        const getprofile=async()=>{
            setLoader(true)
            const res=await axios.get('https://apis.ccbp.in/insta-share/my-profile',{headers:{
                Authorization:`Bearer ${Cookies.get('token')}`
            }});
            setProfile(res.data.profile);
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
                        <p>{profile.user_id}</p>
                        <p>{profile.user_bio}</p>
                    </div>
                </div>
            </div>
            <div className="stories-container">
                {loader ? <ClipLoader/>:
                !profile.stories? ""
                :profile.stories.map(item=>
                    <img key={item.id} className="story" src={item.image} />
                )}
            </div>
            <div className="posts-container">
                <h1>#Posts</h1>
            </div>
            <div className="posts-container">
                {loader ? <ClipLoader/>:
                !profile.posts?"No Post Yet":
                profile.posts.map(item=>
                    <img className="post" key={item.id} src={item.image} />
                )}
            </div>
        </>
    )
}

export default ProfilePage;