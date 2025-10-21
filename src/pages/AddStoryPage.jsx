import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import '../styles/AddPage.css'
function UploadStory() {
    const navigate=useNavigate();
    const {user_id}=useParams();
    const [file, setFile] = useState(null);
    const [preview,setPreview]=useState(null);
    const [loader,setLoader]=useState(false);
    const [error,setError]=useState(false);

    const handleUpload = async () => {
    setLoader(true);
    if (!file) {
        setLoader(false);
        return setError("Upload a file to Post")
    };

    const formData = new FormData();
    formData.append("media", file);
    formData.append("user_id", user_id);

    const res=await axios.post("http://localhost:3000/api/story",formData,{withCredentials: true});
    setLoader(false);
    console.log("Saved story:", res);
    navigate('/')
    };

    const handleChange = async(e)=>{
        const file=e.target.files[0]
        if (file) {
            setError("")
            setPreview(URL.createObjectURL(file));
        }
        setFile(file)
    }

    return (
    <div className="upload-card">
        <label className="file-input">
            <input type="file" accept="image/*,video/*" onChange={e => handleChange(e)} />
            <span>📷 Click to upload image/video</span>
            {preview &&
                <video src={preview} width={200}/>
            }
        </label>
        {error.length>0 && <span className="error" >{error}</span>}
        <button onClick={handleUpload} className="post-btn">{loader?<ClipLoader/>:"Post"}</button>
    </div>
    );
}

export default UploadStory;