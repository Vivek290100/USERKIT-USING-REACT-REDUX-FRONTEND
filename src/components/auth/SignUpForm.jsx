import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setError, setLoading, setToken, setUser } from '../../redux/features/auth/authSlice';
import { validateSignup } from '../../validation/signupValidation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const validationErrors = validateSignup(name, email, password, confirmPassword);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
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
                const errorMessage = error.response.data.message || 'Signup failed. Please try again.'; 
                dispatch(setError(errorMessage));
            } else {
                dispatch(setError('Signup failed. Please try again.'));
            }
            dispatch(setLoading(false));
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r flex flex-col">
            <header className="bg-gradient-to-r from-gray-900 to-gray-700  p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-2xl font-bold">
                        <a href="/">USERKIT</a>
                    </div>
                </div>
            </header>

            <main className="flex-grow bg-gradient-to-r from-gray-900 to-gray-700  flex flex-col items-center justify-center p-4">
                <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-8 rounded-lg shadow-2xl w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-white">Create Your Account</h2>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="block text-white  mb-2" htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                maxLength={15}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-white mb-2" htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div className="relative">
                            <label className="block text-white mb-2" htmlFor="password">Password</label>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 top-8 flex items-center text-gray-600"
                            >
                                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <div className="relative">
                            <label className="block text-white mb-2" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type={isConfirmPasswordVisible ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 top-8 flex items-center text-gray-600"
                            >
                                {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            disabled={loading}
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        {error && <p className="text-red-500">{error}</p>}
                    </form>
                    <p className="mt-6 text-center text-white">
                        Already have an account? <Link to="/login" className="text-green-500 hover:underline">LogIn</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default SignUpForm;
