import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function createUser() {
const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/server/admin/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message); 
        return;
      }
      navigate('/admin/userlist');
    } catch (error) {
      console.error('Failed to create user:', error);
      setError('Failed to create user. Please try again.');
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-2xl text-center mb-4">Create New User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500">{error}</p>}
        <input type="text" id="userName" placeholder="Name" onChange={handleChange} className="p-3 border rounded" />
        <input type="email" id="email" placeholder="Email" onChange={handleChange} className="p-3 border rounded" />
        <input type="password" id="password" placeholder="Password" onChange={handleChange} className="p-3 border rounded" />
        <button type="submit" className="bg-blue-500 text-white p-3 rounded">Create User</button>
      </form>
    </div>
  );
}

export default createUser
