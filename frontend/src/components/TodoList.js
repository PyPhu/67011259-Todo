import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../logo.png';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function TodoList({ username, onLogout }) {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');

    // โหลดข้อมูลเมื่อ username เปลี่ยน
    useEffect(() => {
        if(username) fetchTodos();
    }, [username]);

    const fetchTodos = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/todos/${username}`);
            setTodos(res.data);
        } catch (err) {
            console.error("Error fetching todos:", err);
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        try {
            // ส่ง username ไปด้วย Backend ถึงจะยอมรับ
            const res = await axios.post(`${API_URL}/api/todos`, { username, task: newTask });
            setTodos([...todos, res.data]); // เพิ่มรายการใหม่ต่อท้าย
            setNewTask('');
        } catch (err) {
            console.error("Error adding todo:", err);
            alert("Cannot add task. See console for details.");
        }
    };

    const handleDeleteTodo = async (id) => {
        if(!window.confirm("Delete this task?")) return;
        try {
            await axios.delete(`${API_URL}/api/todos/${id}`);
            setTodos(todos.filter(t => t.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <nav className="navbar navbar-light bg-white shadow-sm mb-4">
                <div className="container">
                    <span className="navbar-brand d-flex align-items-center">
                        <img src={logo} alt="Logo" width="30" className="me-2" />
                        <span className="fw-bold text-primary">CEi Todo</span>
                    </span>
                    <div className="d-flex align-items-center">
                        <span className="me-3 text-muted d-none d-md-block">User: {username}</span>
                        <button onClick={onLogout} className="btn btn-outline-danger btn-sm">Logout</button>
                    </div>
                </div>
            </nav>

            <div className="container" style={{ maxWidth: '600px' }}>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <form onSubmit={handleAddTodo} className="input-group mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Add a new task..." 
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                            <button className="btn btn-primary" type="submit">Add</button>
                        </form>

                        <ul className="list-group list-group-flush">
                            {todos.map(todo => (
                                <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{todo.task}</span>
                                    <button onClick={() => handleDeleteTodo(todo.id)} className="btn btn-link text-danger p-0">
                                        <i className="bi bi-trash"></i> Delete
                                    </button>
                                </li>
                            ))}
                            {todos.length === 0 && <p className="text-center text-muted mt-3">No tasks yet.</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoList;