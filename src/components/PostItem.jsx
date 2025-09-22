import '../styles/postitem.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function PostItem({ postDetails }) {

    const navigate=useNavigate();

    return (
    <div className="postitem-cont">
        <div className="post-header">
            <img className="post-prof-pic" src={postDetails.profile_pic} alt="profile" onClick={()=>navigate(`/profile/${postDetails.user_name}`)}/>
            <p className="post-username" onClick={()=>navigate(`/profile/${postDetails.user_name}`)} >{postDetails.user_name}</p>
        </div>
        <div className="post-img-cont">
            <img src={postDetails.image} alt="post" />
        </div>
        <div className="post-info-wrapper">
            <div className="like-cont">
                <i className='bxr  bx-heart'  ></i> 
                <i className='bxr  bx-message-bubble'  ></i> 
                <i className='bxr  bx-send'  ></i> 
            </div>
            <span className="likes-count">{postDetails.likes_count} likes</span>
            <p className="post-disc">{postDetails.post_disc}</p>
            <span className="post-date">{postDetails.created_at}</span>
        </div>
    </div>
    )
}

export default PostItem
