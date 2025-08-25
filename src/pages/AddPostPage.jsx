import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
function UploadPost() {
    const navigate=useNavigate();
    const {user_id}=useParams();
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");

    const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    const formData = new FormData();
    formData.append("media", file);
    formData.append("post_disc", caption);
    formData.append("user_id", user_id);

    const res=await axios.post("http://localhost:3000/api/post",formData,{withCredentials: true});
    console.log("Saved post:", res);
    navigate('/profile')
    };

    return (
    <div>
        <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files[0])} />
        <input type="text" placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} />
        <button onClick={handleUpload}>Post</button>
    </div>
    );
}

export default UploadPost;