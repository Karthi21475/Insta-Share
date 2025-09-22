import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem';
import '../styles/profilepage.css'
import Nav from '../components/Nav';
import ClipLoader from 'react-spinners/ClipLoader';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from "react-router";
function ProfilePage() {
    const navigate=useNavigate();
    const [profile,setProfile]=useState([]);
    const [loader,setLoader]=useState(false);
    const [storyLoader,setStoryLoader]=useState(false);
    const [postLoader,setPostLoader]=useState(false);
    const [stories,setStories]=useState([]);
    const [posts,setPosts]=useState([]);
    const {user_name}=useParams();
    useEffect(()=>{
        const getprofile=async()=>{
            setLoader(true)
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/user/${user_name}`,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials: true
            });
            setProfile(res.data.user);
            setLoader(false)
            setStoryLoader(true);
            const storyres=await axios.get(`${import.meta.env.VITE_API_URL}/api/story/${user_name}`,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials: true
            });
            setStories(storyres.data.stories);
            setStoryLoader(false);
            setPostLoader(true);
            const postres=await axios.get(`${import.meta.env.VITE_API_URL}/api/post/${user_name}`,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials: true
                });
            setPosts(postres.data.posts);
            setPostLoader(false);
        }
        getprofile();
    },[]);
    return (
        <>
            <Nav profile={true} home={false} showSearch={false}/>
            {loader?<ClipLoader/>:<>
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
                            <p>{profile.user_bio}</p>
                        </div>
                    </div>
                </div>
                <div className="stories-container">
                    {storyLoader ? <ClipLoader/>:
                    !stories? ""
                    :stories.map(item=>
                        <div className='storie-cont' key={item.id}>
                            <div className="story" >
                                <video src={item.video} />
                            </div>
                        </div>
                        
                    )}
                    <div className='storie-cont' onClick={()=>{navigate(`/uploadStory/${profile.user_id}`)}}>
                        <div className="story" >
                            <svg fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M306,192h-48v-48c0-4.4-3.6-8-8-8s-8,3.6-8,8v48h-48c-4.4,0-8,3.6-8,8s3.6,8,8,8h48v48c0,4.4,3.6,8,8,8s8-3.6,8-8v-48h48 c4.4,0,8-3.6,8-8S310.4,192,306,192z"></path> </g></svg>
                        </div>
                    </div>
                </div>
                <div className="posts-container">
                    <h1>#Posts</h1>
                </div>
                <div className="posts-container">
                    {postLoader ? <ClipLoader/>:
                    !posts?"No Post Yet":
                    posts.map(item=>
                        <img className="post" key={item.post_id} src={item.image} />
                    )}
                    <div className='postt-cont' onClick={()=>{navigate(`/uploadPost/${profile.user_id}`)}}>
                        <div className="ad-post" >
                            <svg fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M306,192h-48v-48c0-4.4-3.6-8-8-8s-8,3.6-8,8v48h-48c-4.4,0-8,3.6-8,8s3.6,8,8,8h48v48c0,4.4,3.6,8,8,8s8-3.6,8-8v-48h48 c4.4,0,8-3.6,8-8S310.4,192,306,192z"></path> </g></svg>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default ProfilePage;