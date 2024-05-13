"use client"
import { useState } from "react";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const handeFileChange = (e : any) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    if (!file) return; 
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    
    console.log(formData);

    try {
      // hit the aws route in api folder
      const response = await fetch('api/aws', {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      console.log(data.status);
      // at this point file is done uplaoding therefore set it back to false;
      setUploading(false)
    } catch (error: any) { 
      console.log(error);
      setUploading(false);
    }
  }

  return(
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handeFileChange}/>
        <button type="submit" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default UploadImage;