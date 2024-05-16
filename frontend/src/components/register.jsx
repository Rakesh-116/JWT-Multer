import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('/api/register', {username, fullName, email, password})
            console.log(response);
            navigate('/');
        }catch (err){
            console.log(err);
        }
    }


    return (
        <>
            <div className="w-full h-full flex justify-center items-center p-10">
                <form onSubmit={handleSubmit} className="p-6 bg-white border-2 border-black flex flex-col items-center justify-center rounded-xl">
                    <h1 className="font-bold">Register</h1>
                    <div>
                        <h1 className="font-semibold">Username</h1>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            placeholder="Enter your username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="border-2 border-gray-500 rounded-xl p-2"
                        />
                        <h1 className="font-semibold">Full Name</h1>
                        <input
                            type="text"
                            name="fullname"
                            id="fullname"
                            value={fullName}
                            placeholder="Enter your fullname"
                            onChange={(e) => setFullName(e.target.value)}
                            className="border-2 border-gray-500 rounded-xl p-2"
                        />
                        <h1 className="font-semibold">Email</h1>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-2 border-gray-500 rounded-xl p-2"
                        />
                        <h1 className="font-semibold">Password</h1>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-2 border-gray-500 rounded-xl p-2"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 p-2 m-5 rounded text-white">
                        Register
                    </button>
                    <p>
                        Already Have an Account?
                        <Link to='/' className="text-blue-500">Login</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Register;