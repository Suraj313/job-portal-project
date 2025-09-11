import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password1 !== password2) {
            setError("Passwords don't match.");
            return;
        }

        try {
            await signup(email, password1, password2);
            navigate('/');
        } catch (err) {
            let errorMessage = 'An unexpected error occurred. Please try again.';
            if (err.response && err.response.data) {
                const errors = err.response.data;
                const errorKey = Object.keys(errors)[0];
                if (errorKey) {
                    const firstMessage = errors[errorKey][0];
                    const formattedKey = errorKey.charAt(0).toUpperCase() + errorKey.slice(1);
                    errorMessage = `${formattedKey}: ${firstMessage}`;
                }
            }
            setError(errorMessage);
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} className="w-full p-3 border rounded-lg" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} className="w-full p-3 border rounded-lg" required />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700">
                        Sign Up
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account? <Link to="/login" className="text-indigo-600">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;