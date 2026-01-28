import React, { useState } from 'react';
import axios from 'axios';
import logo from '../logo.png'; 

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // เรียกไปที่ /api/login
            const res = await axios.post(`${API_URL}/api/login`, { username });
            if (res.data.success) {
                onLogin(username);
            }
        } catch (err) {
            alert('Login failed. Please check backend connection.');
            console.error(err);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="text-center mb-4">
                    {/* ถ้าไม่มีโลโก้ ให้ลบบรรทัด img นี้ออกได้ */}
                    <img src={logo} alt="CEi Logo" style={{ height: '60px' }} />
                    <h4 className="mt-3">CEi Todo List</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username (Student ID)</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter ID e.g. 6601xxxx" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;