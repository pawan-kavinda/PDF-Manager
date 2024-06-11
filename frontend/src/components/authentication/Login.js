import React, { useState } from 'react';
import useLogin from '../../hooks/useLogin';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signIn,isLoading,error}  = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();     
       signIn(email,password)
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                            required
                        />
                    </div>
                    <button
                        disabled = {isLoading}
                        type="submit"
                        className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-100"
                    >
                        Login
                    </button>
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default Login;
