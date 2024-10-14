import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);
    const [createUser, setCreateUser] = useState({
        user_id: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        age: '',
        gender: '',
        nationality: '',
        bio: ''
    });
    const [updateUser, setUpdateUser] = useState({
        user_id: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        age: '',
        gender: '',
        nationality: '',
        bio: ''
    });
    const [deleteUserId, setDeleteUserId] = useState('');
    const [resultMessage, setResultMessage] = useState('');

    // Fetch all users
    const fetchUsers = () => {
        axios.get('http://localhost:5000/api/users')
            .then(response => {
                console.log('Fetched users:', response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setResultMessage('Error fetching users');
            });
    };

    // Handle form submission to create a user
    const handleCreateSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users', createUser)
            .then(response => {
                console.log('User created:', response.data);
                setUsers([...users, response.data]);
                setResultMessage('User created successfully');
                resetCreateForm();
            })
            .catch(error => {
                console.error('Error creating user:', error);
                setResultMessage('Error creating user');
            });
    };

    // Handle form submission to update a user
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5000/api/users/${updateUser.user_id}', updateUser)
            .then(response => {
                console.log('User updated:', response.data);
                setUsers(users.map(user => (user.user_id === updateUser.user_id ? response.data : user)));
                setResultMessage('User updated successfully');
                resetUpdateForm();
            })
            .catch(error => {
                console.error('Error updating user:', error);
                setResultMessage('Error updating user');
            });
    };

    // Handle form submission to delete a user
    const handleDeleteSubmit = () => {
        axios.delete('http://localhost:5000/api/users/${deleteUserId}')
            .then(response => {
                console.log('User deleted:', response.data);
                setUsers(users.filter(user => user.user_id !== deleteUserId));
                setResultMessage('User deleted successfully');
                setDeleteUserId('');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                setResultMessage('Error deleting user');
            });
    };

    // Handle form change for create user
    const handleCreateChange = (e) => {
        setCreateUser({ ...createUser, [e.target.name]: e.target.value });
    };

    // Handle form change for update user
    const handleUpdateChange = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
    };

    // Handle form change for delete user
    const handleDeleteChange = (e) => {
        setDeleteUserId(e.target.value);
    };

    // Reset create form
    const resetCreateForm = () => {
        setCreateUser({
            user_id: '',
            username: '',
            email: '',
            password: '',
            phone: '',
            age: '',
            gender: '',
            nationality: '',
            bio: ''
        });
    };

    // Reset update form
    const resetUpdateForm = () => {
        setUpdateUser({
            user_id: '',
            username: '',
            email: '',
            password: '',
            phone: '',
            age: '',
            gender: '',
            nationality: '',
            bio: ''
        });
    };

    return (
        <div>
            <h1>User Management</h1>

            {/* Create User Section */}
            <section>
                <h2>Create User</h2>
                <form onSubmit={handleCreateSubmit}>
                    <input type="number" name="user_id" placeholder="User ID" value={createUser.user_id} onChange={handleCreateChange} required />
                    <input type="text" name="username" placeholder="Username" value={createUser.username} onChange={handleCreateChange} required />
                    <input type="email" name="email" placeholder="Email" value={createUser.email} onChange={handleCreateChange} required />
                    <input type="password" name="password" placeholder="Password" value={createUser.password} onChange={handleCreateChange} required />
                    <input type="text" name="phone" placeholder="Phone" value={createUser.phone} onChange={handleCreateChange} required />
                    <input type="number" name="age" placeholder="Age" value={createUser.age} onChange={handleCreateChange} required />
                    <input type="text" name="gender" placeholder="Gender" value={createUser.gender} onChange={handleCreateChange} required />
                    <input type="text" name="nationality" placeholder="Nationality" value={createUser.nationality} onChange={handleCreateChange} required />
                    <input type="text" name="bio" placeholder="Bio" value={createUser.bio} onChange={handleCreateChange} />
                    <button type="submit">Create User</button>
                </form>
            </section>

            {/* Update User Section */}
            <section>
                <h2>Update User</h2>
                <form onSubmit={handleUpdateSubmit}>
                    <input type="number" name="user_id" placeholder="User ID to Update" value={updateUser.user_id} onChange={handleUpdateChange} required />
                    <input type="text" name="username" placeholder="Username" value={updateUser.username} onChange={handleUpdateChange} />
                    <input type="email" name="email" placeholder="Email" value={updateUser.email} onChange={handleUpdateChange} />
                    <input type="password" name="password" placeholder="Password" value={updateUser.password} onChange={handleUpdateChange} />
                    <input type="text" name="phone" placeholder="Phone" value={updateUser.phone} onChange={handleUpdateChange} />
                    <input type="number" name="age" placeholder="Age" value={updateUser.age} onChange={handleUpdateChange} />
                    <input type="text" name="gender" placeholder="Gender" value={updateUser.gender} onChange={handleUpdateChange} />
                    <input type="text" name="nationality" placeholder="Nationality" value={updateUser.nationality} onChange={handleUpdateChange} />
                    <input type="text" name="bio" placeholder="Bio" value={updateUser.bio} onChange={handleUpdateChange} />
                    <button type="submit">Update User</button>
                </form>
            </section>

            {/* Delete User Section */}
            <section>
                <h2>Delete User</h2>
                <input type="number" name="deleteUserId" placeholder="User ID to Delete" value={deleteUserId} onChange={handleDeleteChange} required />
                <button onClick={handleDeleteSubmit}>Delete User</button>
            </section>

             {/* View Users Section */}
            <section>
                <h2>View Users</h2>
                <button onClick={fetchUsers}>Fetch Users</button>
                <ul>
                    {users.length > 0 ? (
                        users.map(user => (
                            <li key={user._id}>
                                {user.username} - {user.email}
                            </li>
                        ))
                    ) : (
                        <li>No users found</li>
                    )}
                </ul>
            </section>

            {/* Results Section */}
            <section>
                <h2>Results</h2>
                <p>{resultMessage}</p>
            </section>
        </div>
    );
}

export default App;