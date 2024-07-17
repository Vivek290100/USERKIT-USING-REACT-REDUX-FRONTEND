import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setError, setLoading, setToken, setUser } from '../../redux/features/auth/authSlice';

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            dispatch(setError('Passwords do not match.'));
            return;
        }

        dispatch(setLoading(true));

        try {
            const response = await axios.post('/api/auth/signup', { name, email, password });
            const { user, token } = response.data;
            dispatch(setUser(user));
            dispatch(setToken(token));
            dispatch(setLoading(false));
            navigate('/profile'); 
        } catch (error) {
          console.error('Signup error:', error.response || error.message || error);
          if (error.response && error.response.status === 400) {
            dispatch(setError('User with this email already exists.'));
        } else {
            dispatch(setError('Signup failed. Please try again.'));
        }          dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r flex flex-col">
            <header className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-2xl font-bold">
                        <a href="/">USERKIT</a>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Create Your Account</h2>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="block text-gray-600 mb-2" htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                autoComplete="name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2" htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        {error && <p className="text-red-500">{error}</p>}
                    </form>
                    <p className="mt-6 text-center text-gray-600">
                        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">LogIn</Link>
                    </p>
                </div>
            </main>

            <footer className="bg-gray-800 p-4 text-center text-gray-400">
                <p>&copy; 2024 User Management. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SignUpForm;
