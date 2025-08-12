import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx';
import PostItem from '../components/PostItem.jsx';
import axios from 'axios';
import '../styles/Homepage.css'
import ClipLoader from 'react-spinners/ClipLoader';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from 'js-cookie';
function Homepage() {

  const [storyLoader,setStoryLoader]=useState(false);
  const [postLoader,setPostLoader]=useState(false);
  const [resultLoader,setResultLoader]=useState(false);
  const [stories,setStories]=useState([]);
  const [posts,setPosts]=useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  const [searchResults,setSearchResults]=useState([]);

  const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
};

  useEffect(()=>{
    const getstories=async()=>{
        setStoryLoader(true);
        const res=await axios.get('https://apis.ccbp.in/insta-share/stories',{
          headers:{
            Authorization:`Bearer ${Cookies.get('token')}`
          }});
        setStories(res.data.users_stories);
        setStoryLoader(false);
    }
    getstories();
    const getposts=async()=>{
      setPostLoader(true);
      const res=await axios.get('https://apis.ccbp.in/insta-share/posts',{headers:{
            Authorization:`Bearer ${Cookies.get('token')}`
          }});
      setPosts(res.data.posts);
      setPostLoader(false);
    }
    getposts();
  },[])
  useEffect(()=>{
    if(searchTerm.length>0){
    const getResults=async()=>{
      setResultLoader(true);
      const res=await axios.get(`https://apis.ccbp.in/insta-share/posts?search=${searchTerm}`,{headers:{
        Authorization:`Bearer ${Cookies.get('token')}`
      }})
      setSearchResults(res.data.posts);
      setResultLoader(false);
    }
    getResults();
  }
  },[searchTerm])
  return (
    <>
        <Nav home={true} profile={false} showSearch={true} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {
          searchTerm.length>0 ?
          <div className='posts-cont'>
              <h2>Search Results</h2>
              {resultLoader?
              <div className='Loader-cont'>
                <ClipLoader className='Loader'/>
              </div>
                :searchResults.map(item=>{
                  return <PostItem postDetails={item} key={item.post_id}/>
              })}
          </div>
          :
          <>
            <div className='slide-wrapper'>
                {storyLoader?
                  <ClipLoader className='Loader'/>
                :
                <Slider {...settings}>{
                  stories.map(item=>{
                    return (
                      <div className="story-cont"  key={item.id}>
                        <img className="story" src={item.story_url} />
                        {item.user_name}
                      </div>
                    )}
                  )}
                </Slider>
              }
            </div>
            <div className="posts-cont">
                {postLoader?
                <div className='Loader-cont'>
                  <ClipLoader className='Loader'/>
                </div>
                :posts.map(item=>{
                  return <PostItem postDetails={item} key={item.post_id}/>
                })}
            </div>
          </>
        }
    </>
  )
}

export default Homepage