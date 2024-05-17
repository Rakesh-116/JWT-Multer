import { useState } from "react";
import axios from 'axios';


const Home = () => {
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData();
            formData.append('file', file);
            const response = await axios.post('/api/home', {formData}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response);
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <>
            <div className="w-full h-full flex justify-center items-center p-10">
                <form className="p-6 border-2 border-black rounded-xl" onSubmit={handleSubmit}>
                    <h1>File Upload</h1>
                    <input 
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button type="submit" className="rounded text-white bg-blue-500 hover:bg-blue-700 p-2 m-5">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Home;