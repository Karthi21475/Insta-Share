import React,{useState} from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import Nav from '../components/Nav';
import '../styles/SearchPage.css'
import { ClipLoader } from 'react-spinners';
import PostItem from '../components/PostItem';

function SearchPage() {
    const [searchTerm,setSearchTerm]=useState("");
    const [searchResults,setSearchResults]=useState([]);
    const [resultLoader,setResultLoader]=useState(false);

    const getResults=async()=>{
            if(searchTerm.length>0){
                setResultLoader(true);
                const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/search`,{params:{searchTerm:searchTerm},withCredentials:true}
                )
                setSearchResults(res.data);
                setResultLoader(false);
            }
    }
    return (
        <>
            <Nav search={true}/>
            <form className='search-cont' onSubmit={(e)=>{
                e.preventDefault();
                getResults();
            }}>
                <input type="text" value={searchTerm} onChange={(e)=>{
                    setSearchTerm(e.target.value);
                }} placeholder="Search..." />
            </form>
            <div className='search-results'>
                {
                (searchResults.posts || searchResults.users) &&
                <>
                {
                searchResults.users.length>0 ?
                    <div className='posts-cont'>
                        {resultLoader?
                        <div className='Loader-cont'>
                            <ClipLoader className='Loader'/>
                        </div>
                        :
                        searchResults.users&& searchResults.users.map(item=>{
                            return <>
                                <div key={item.user_id} className='prof-cont'>
                                        <img src={item.profile_pic} />
                                        {item.user_name}
                                </div>
                            </>
                        })}
                    </div>
                    :<>
                    {
                    searchResults.posts.length>0 ?
                        <div className='posts-cont'>
                            {resultLoader?
                            <div className='Loader-cont'>
                                <ClipLoader className='Loader'/>
                            </div>
                            :
                            searchResults.posts&& searchResults.posts.map(item=>{
                                return <PostItem postDetails={item} key={item.post_id}/>
                            })}
                        </div>
                        :
                        <h2>No Results for the search</h2>
                    }
                    </>
                }
                </>
                }
            </div>
        </>
    )
}

export default SearchPage