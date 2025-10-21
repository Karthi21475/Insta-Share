import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import '../styles/AddPage.css'
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
function UploadPost() {
    const navigate=useNavigate();
    const {user_id}=useParams();
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [preview,setPreview]=useState(null);
    const [loader,setLoader]=useState(false);
    const [error,setError]=useState(false);

    const handleUpload = async () => {
    setLoader(true);
    if (!file) {
        setLoader(false);
        toast.error("Upload a file to Post")
        return setError("Upload a file to Post")
    };

    const formData = new FormData();
    formData.append("media", file);
    formData.append("post_disc", caption);
    formData.append("user_id", user_id);

    await axios.post(`${import.meta.env.VITE_API_URL}/api/post`,formData,{withCredentials: true});
    setLoader(false)
    toast.success("Posted successfully")
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
        <label class="file-input">
            <input type="file" accept="image/*,video/*" onChange={e => {handleChange(e)}} />
            <span>📷 Click to {preview && "re"}upload image/video</span>
            {preview &&
                <img src={preview} width={200}/>
            }
        </label>
        <input className="caption-input" type="text" placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} />
        {error.length>0 && <span className="error" >{error}</span>}
        <button onClick={handleUpload} className="post-btn">
            {loader?<ClipLoader/>:"Post"}
        </button>
    </div>
    );
}

export default UploadPost;