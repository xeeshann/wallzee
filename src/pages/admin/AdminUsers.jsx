import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import adminService from '../../appwrite/admin';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const { user: currentUser } = useAuth();

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const userList = await adminService.getAllUsers();
            setUsers(userList);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleMakeAdmin = async (userId) => {
        if (!window.confirm('Are you sure you want to grant admin privileges to this user?')) {
            return;
        }
        
        try {
            await adminService.makeUserAdmin(userId);
            
            // Update state to reflect admin status
            setUsers(users.map(u => 
                u.$id === userId 
                    ? { ...u, isAdmin: true } 
                    : u
            ));
            
        } catch (error) {
            console.error('Error making user admin:', error);
            setError('Failed to update user permissions: ' + error.message);
        }
    };

    const handleRemoveAdmin = async (userId) => {
        if (!window.confirm('Are you sure you want to remove admin privileges from this user?')) {
            return;
        }
        
        try {
            await adminService.removeUserAdmin(userId);
            
            // Update state to reflect admin status
            setUsers(users.map(u => 
                u.$id === userId 
                    ? { ...u, isAdmin: false } 
                    : u
            ));
            
        } catch (error) {
            console.error('Error removing admin rights:', error);
            setError('Failed to update user permissions: ' + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Admin Navbar */}
            <div className="navbar bg-base-200 shadow-md">
                <div className="flex-1">
                    <Link to="/admin/dashboard" className="btn btn-ghost text-xl">WallZee Admin</Link>
                </div>
                <div className="flex-none">
                    <Link to="/" className="btn btn-ghost">View Site</Link>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 h-screen bg-white shadow-md">
                    <nav className="pt-5">
                        <ul className="menu bg-base-200 w-full rounded-box">
                            <li>
                                <Link to="/admin/dashboard">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/wallpapers">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Wallpapers
                                </Link>
                            </li>
                            <li className="bordered">
                                <Link to="/admin/users" className="active">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    Users
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/categories">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/settings">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Manage Users</h1>
                    </div>
                    
                    {error && (
                        <div className="alert alert-error mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}
                    
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-8 bg-white rounded-lg shadow">
                            <h3 className="text-lg font-medium">No users found</h3>
                            <p className="mt-2 text-gray-500">There are no registered users in the system.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.$id}>
                                            <td className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                                                        <span className="text-lg font-medium">{user.name?.charAt(0) || user.email?.charAt(0) || '?'}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.name}</div>
                                                    <div className="text-sm opacity-70">ID: {user.$id.substring(0, 8)}</div>
                                                </div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>
                                                {user.isAdmin ? (
                                                    <span className="badge badge-primary">Admin</span>
                                                ) : (
                                                    <span className="badge">Regular User</span>
                                                )}
                                            </td>                                            <td>{new Date(user.$createdAt).toLocaleDateString()}</td>
                                            <td>
                                                {user.$id !== currentUser?.$id && (
                                                    <div className="flex gap-2">
                                                        {user.isAdmin ? (
                                                            <button 
                                                                className="btn btn-sm btn-outline btn-error"
                                                                onClick={() => handleRemoveAdmin(user.$id)}
                                                            >
                                                                Remove Admin
                                                            </button>
                                                        ) : (
                                                            <button 
                                                                className="btn btn-sm btn-outline btn-primary"
                                                                onClick={() => handleMakeAdmin(user.$id)}
                                                            >
                                                                Make Admin
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminUsers;
