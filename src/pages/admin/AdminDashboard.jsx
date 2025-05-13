import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import adminService from '../../appwrite/admin';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalWallpapers: 0,
        phoneWallpapers: 0,
        desktopWallpapers: 0,
        totalDownloads: 0,
        recentWallpapers: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch stats on component mount
    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const dashboardStats = await adminService.getDashboardStats();
            setStats(dashboardStats);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            setError('Failed to load dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Admin Navbar */}
            <div className="navbar bg-base-200 shadow-md">
                <div className="flex-1">
                    <Link to="/admin/dashboard" className="btn btn-ghost text-xl">WallZee Admin</Link>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center">
                                <span className="text-lg">{user?.name?.charAt(0) || 'A'}</span>
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                </a>
                            </li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
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
                                </Link>                            </li>
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
                    {error && (
                        <div className="alert alert-error mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Stats Cards */}
                            <div className="stat bg-white shadow-md rounded-lg">
                                <div className="stat-figure text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="stat-title">Total Wallpapers</div>
                                <div className="stat-value text-primary">{stats.totalWallpapers}</div>
                                <div className="stat-desc">{stats.recentWallpapers} new in last month</div>
                            </div>

                            <div className="stat bg-white shadow-md rounded-lg">
                                <div className="stat-figure text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="stat-title">Phone Wallpapers</div>
                                <div className="stat-value text-secondary">{stats.phoneWallpapers}</div>
                                <div className="stat-desc">{Math.round((stats.phoneWallpapers / stats.totalWallpapers) * 100) || 0}% of total</div>
                            </div>

                            <div className="stat bg-white shadow-md rounded-lg">
                                <div className="stat-figure text-accent">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="stat-title">Desktop Wallpapers</div>
                                <div className="stat-value text-accent">{stats.desktopWallpapers}</div>
                                <div className="stat-desc">{Math.round((stats.desktopWallpapers / stats.totalWallpapers) * 100) || 0}% of total</div>
                            </div>

                            <div className="stat bg-white shadow-md rounded-lg">
                                <div className="stat-figure text-info">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                    </svg>
                                </div>
                                <div className="stat-title">Total Downloads</div>
                                <div className="stat-value text-info">{stats.totalDownloads}</div>
                                <div className="stat-desc">User engagement metric</div>
                            </div>
                        </div>
                    )}

                    {/* Recent Activity */}
                    <div className="bg-white shadow-md rounded-lg mt-8 p-6">
                        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                        
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <span className="loading loading-spinner loading-md text-primary"></span>
                            </div>
                        ) : stats.totalWallpapers === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No wallpapers have been uploaded yet.</p>
                                <Link to="/admin/wallpapers" className="btn btn-primary mt-4">
                                    Upload Your First Wallpaper
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Action</th>
                                            <th>Details</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Wallpaper Stats Updated</td>
                                            <td>{stats.totalWallpapers} wallpapers available</td>
                                            <td>{new Date().toLocaleDateString()}</td>
                                            <td><span className="badge badge-success">Active</span></td>
                                        </tr>
                                        <tr>
                                            <td>Phone Wallpapers</td>
                                            <td>{stats.phoneWallpapers} available</td>
                                            <td>{new Date().toLocaleDateString()}</td>
                                            <td><span className="badge badge-info">Current</span></td>
                                        </tr>
                                        <tr>
                                            <td>Desktop Wallpapers</td>
                                            <td>{stats.desktopWallpapers} available</td>
                                            <td>{new Date().toLocaleDateString()}</td>
                                            <td><span className="badge badge-info">Current</span></td>
                                        </tr>
                                        <tr>
                                            <td>Download Activity</td>
                                            <td>{stats.totalDownloads} total downloads</td>
                                            <td>{new Date().toLocaleDateString()}</td>
                                            <td><span className="badge badge-primary">Tracked</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
