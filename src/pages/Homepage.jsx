import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx';
import PostItem from '../components/PostItem.jsx';
import axios from 'axios';
import '../styles/Homepage.css'
import ClipLoader from 'react-spinners/ClipLoader';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Homepage() {

  const [storyLoader,setStoryLoader]=useState(false);
  const [postLoader,setPostLoader]=useState(false);
  const [stories,setStories]=useState([]);
  const [posts,setPosts]=useState([]);
  

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
        const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/story`);
        setStories(res.data.stories);
        setStoryLoader(false);
    }
    getstories();
    const getposts=async()=>{
      setPostLoader(true);
      const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/post`);
      setPosts(res.data.posts);
      setPostLoader(false);
    }
    getposts();
  },[])
  return (
    <>
        <Nav home={true} profile={false} showSearch={true}/>
        <div className='slide-wrapper'>
            {storyLoader?
              <ClipLoader className='Loader'/>
            :
            <Slider {...settings}>{
              stories && stories.map(item=>{
                {console.log(item)}
                return (
                  <div className="story-cont"  key={item.user_id}>
                    <div className='story'>
                      <img src={item.profile_pic} />
                    </div>
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
            :posts && posts.map(item=>{
              return <PostItem postDetails={item} key={item.post_id}/>
            })}
        </div>
    </>
  )
}

export default Homepage