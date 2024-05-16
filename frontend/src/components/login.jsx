import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/', {username, password})
            console.log(response);
            if(response.data){
                navigate('/home')
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="w-full h-full flex justify-center items-center p-10">
                <form onSubmit={handleSubmit} className="p-6 border-2 border-black flex flex-col justify-center items-center rounded-xl">
                    <h1 className="font-bold">Login</h1>
                    <div>
                        <h1 className="font-semibold">Username</h1>
                        <input 
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border-2 border-gray-500 rounded-xl p-2"
                        />
                        <h1 className="font-semibold">Password</h1>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-2 border-gray-500 rounded-xl p-2"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 p-2 m-5 rounded">
                        Login
                    </button>
                    <p>
                        Not Registered Yet?
                        <Link to='/register' className="text-blue-500">Register Here</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login;