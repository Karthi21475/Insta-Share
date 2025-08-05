import '../styles/productitem.css'
import {Link} from 'react-router-dom'; 
function PostItem({postDetails}) {
    console.log(postDetails)

    const {username,posts,profilepic}=postDetails;


    return (
    <>
        <div className="postitem-cont">
            <div className='post-pic-cont'>
                <img className='post-prof-pic' src={profilepic}/>
                <p>{username}</p>
            </div>
            <div className="post-info-wrapper">
                <img src={'https://placehold.co/1040x614'} />
            </div>
        </div>
    </>
    )
}

export default PostItem