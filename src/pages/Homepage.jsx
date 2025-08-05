import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx';
import PostItem from '../components/PostItem.jsx';
import axios from 'axios';
import '../styles/Homepage.css'
import ClipLoader from 'react-spinners/ClipLoader';
function Homepage() {

  const [storyLoader,setStoryLoader]=useState(false);
  const [postLoader,setPostLoader]=useState(false);
  const [stories,setStories]=useState([]);
  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    const getstories=async()=>{
        setStoryLoader(true);
        const res=await axios.get(`${import.meta.env.VITE_API_URL}`+'/api/user/stories',{withCredentials: true});
        setStories(res.data);
        setStoryLoader(false);
    }
    getstories();
    const getposts=async()=>{
      setPostLoader(true);
      const res=await axios.get('https://apis.ccbp.in/insta-share/posts',{withCredentials: true});
      setPosts(res.data);
      setPostLoader(false);
    }
    getposts();
  },[])

  return (
    <>
        <Nav/>
        <div className="slide-wrapper">
          {storyLoader?<ClipLoader/>:stories.map(item=>{
            return <img className="story" src={item.profilepic} key={item.id} />
          })}
        </div>
        <div className="posts-cont">
            {postLoader?<ClipLoader/>:posts.map(item=>{
              return <PostItem postDetails={item} key={item.id}/>
            })}
        </div>
    </>
  )
}

export default Homepage