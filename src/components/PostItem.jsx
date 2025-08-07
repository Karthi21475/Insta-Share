import '../styles/productitem.css'
import {Link} from 'react-router-dom'; 
function PostItem({postDetails}) {

    const {user_name,profile_pic,post_details,likes_count,created_at}=postDetails;


    return (
    <>
        <div className="postitem-cont">
            <div className='post-pic-cont'>
                <img className='post-prof-pic' src={profile_pic}/>
                <p>{user_name}</p>
            </div>
                <div className='post-img-cont'>
                    <img src={post_details.image_url} />
                </div>
            <div className="post-info-wrapper">
                {likes_count} likes
                <p>{post_details.caption}</p>
                <span style={{opacity:'0.5'}}>{created_at}</span>
            </div>
        </div>
    </>
    )
}

export default PostItem