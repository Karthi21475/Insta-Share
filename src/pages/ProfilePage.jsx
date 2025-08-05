import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem';
import '../styles/productspage.css'
import Nav from '../components/Nav';
import ClipLoader from 'react-spinners/ClipLoader';
function ProfilePage() {

    const [profile,setProfile]=useState([]);
    const [loader,setLoader]=useState(false);
    useEffect(()=>{
        const getprofile=async()=>{
            setLoader(true)
            const res=await axios.get(`${import.meta.env.VITE_API_URL}`+`api/user/my-profile`);
            console.log(res.data);
            setProfile(res.data);
            setLoader(false)
        }
        getprofile();
    },[]);

    return (
        <>
            <Nav/>
            <div className="profile-cont">
                <img className='prof-pic-lg' src={profile.profile_pic}/>
                <div className="profile-about">
                    <div className='prof-pic-user-cont'>
                        <img className='prof-pic-md' src={profile.profile_pic}/>
                    </div>
                    <div className="prof-connections">
                        <h1>{profile.user_name}</h1>
                        <p>{profile.posts_count}posts</p>
                        <p>{profile.followers_count}followers</p>
                        <p>{profile.following_count}following</p>
                    </div>
                    <div className="prof-info">
                        {profile.user_id}
                        {profile.user_bio}
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