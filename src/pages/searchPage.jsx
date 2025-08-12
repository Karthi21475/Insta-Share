import React,{useEffect,useState} from 'react'
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
    }},[searchTerm])

    return (
        <>
            <Nav search={true}/>
            <div className='search-cont'>
                <input type="text" value={searchTerm} onChange={(e)=>{
                    setSearchTerm(e.target.value);
                }} placeholder="Search..." />
            </div>
            <div className='search-results'>
                <h3>Search Results</h3>
                {searchTerm.length>0 ?
                    <div className='posts-cont'>
                        {resultLoader?
                        <div className='Loader-cont'>
                            <ClipLoader className='Loader'/>
                        </div>
                            :searchResults.map(item=>{
                            return <PostItem postDetails={item} key={item.post_id}/>
                        })}
                    </div>
                    :
                    ''
                }
            </div>
        </>
    )
}

export default SearchPage