import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import adminService from '../../appwrite/admin';
import { ID } from 'appwrite';

const AdminWallpapers = () => {    
    const [wallpapers, setWallpapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('phone'); // Default category
    const [categoryId, setCategoryId] = useState(''); // For category selection
    const [categories, setCategories] = useState([]); // Store available categories
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    const { user } = useAuth();

    // Fetch wallpapers and categories on component mount
    useEffect(() => {
        fetchWallpapers();
        fetchCategories();
    }, []);    
      const fetchWallpapers = async () => {
        try {
            setLoading(true);
            const wallpapers = await adminService.getAllWallpapers();
            console.log("Fetched wallpapers:", wallpapers); // Debug log
            
            // Make sure any wallpapers with missing imageUrl have a default value
            const processedWallpapers = wallpapers.map(wallpaper => {
                if (!wallpaper.imageUrl) {
                    console.warn("Wallpaper missing imageUrl:", wallpaper.$id);
                    return { ...wallpaper, imageUrl: "https://placehold.co/100x100?text=No+Image" };
                }
                return wallpaper;
            });
            
            setWallpapers(processedWallpapers);
        } catch (error) {
            console.error('Error fetching wallpapers:', error);
            setError('Failed to load wallpapers');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const categoriesList = await adminService.getAllCategories();
            setCategories(categoriesList);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };    const handleUpload = async (e) => {
        e.preventDefault();
        
        if (!selectedFile) {
            setError('Please select a file to upload');
            return;
        }
        
        if (!title.trim()) {
            setError('Please enter a title');
            return;
        }
        
        try {
            setIsUploading(true);
            setError('');
            setUploadProgress(0);
              // Upload wallpaper using adminService
            const wallpaper = await adminService.uploadWallpaper(
                selectedFile, 
                title, 
                category,
                categoryId || null // Include the categoryId if selected
            );
            
            console.log("Uploaded wallpaper:", wallpaper);
            console.log("Image URL:", wallpaper.imageUrl);
            
            // Reset form
            setTitle('');
            setSelectedFile(null);
            setCategoryId('');
            setUploadProgress(0);
            setShowModal(false);
            
            // Add newly uploaded wallpaper to state
            setWallpapers(prevWallpapers => [wallpaper, ...prevWallpapers]);
            
        } catch (error) {
            console.error('Upload error:', error);
            setError('Failed to upload wallpaper: ' + (error.message || 'Unknown error'));
        } finally {
            setIsUploading(false);
        }
    };
    
    // Delete a wallpaper
    const handleDelete = async (id, imageId) => {
        if (!window.confirm('Are you sure you want to delete this wallpaper?')) {
            return;
        }
        
        try {
            await adminService.deleteWallpaper(id, imageId);
            
            // Update state
            setWallpapers(wallpapers.filter(wallpaper => wallpaper.$id !== id));
            
        } catch (error) {
            console.error('Delete error:', error);
            setError('Failed to delete wallpaper: ' + error.message);
        }
    };

    // Toggle featured status
    const toggleFeatured = async (id, currentStatus) => {
        try {
            await adminService.featureWallpaper(id, !currentStatus);
            
            // Update local state
            setWallpapers(wallpapers.map(wallpaper => 
                wallpaper.$id === id 
                    ? { ...wallpaper, featured: !currentStatus } 
                    : wallpaper
            ));
        } catch (error) {
            console.error('Feature toggle error:', error);
            setError('Failed to update wallpaper status: ' + error.message);
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
                            <li className="bordered">
                                <Link to="/admin/wallpapers">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Wallpapers
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
                        <h1 className="text-2xl font-bold">Manage Wallpapers</h1>
                        <button 
                            className="btn btn-primary"
                            onClick={() => setShowModal(true)}
                        >
                            Upload New Wallpaper
                        </button>
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
                    ) : wallpapers.length === 0 ? (
                        <div className="text-center py-8 bg-white rounded-lg shadow">
                            <h3 className="text-lg font-medium">No wallpapers found</h3>
                            <p className="mt-2 text-gray-500">Upload your first wallpaper by clicking the button above.</p>
                        </div>
                    ) : (                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Device Type</th>
                                        <th>Category</th>
                                        <th>Uploaded</th>
                                        <th>Downloads</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wallpapers.map(wallpaper => {
                                        // Find the category name if available
                                        const wallpaperCategory = categories.find(cat => cat.$id === wallpaper.categoryId);
                                          return (
                                            <tr key={wallpaper.$id}>
                                                <td>
                                                    <div className="avatar">
                                                        <div className="w-16 h-16 rounded">
                                                            {wallpaper.imageUrl ? (
                                                                <img 
                                                                    src={wallpaper.imageUrl} 
                                                                    alt={wallpaper.title}
                                                                    onError={(e) => {
                                                                        console.error("Image failed to load:", wallpaper.imageUrl);
                                                                        e.target.src = "https://placehold.co/100x100?text=No+Image";
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                                                                    <span className="text-xs text-gray-500">No image</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{wallpaper.title}</td>
                                                <td>
                                                    <span className={`badge ${wallpaper.category === 'phone' ? 'badge-primary' : 'badge-secondary'}`}>
                                                        {wallpaper.category}
                                                    </span>
                                                </td>
                                                <td>
                                                    {wallpaperCategory ? (
                                                        <div className="flex items-center gap-1">
                                                            {wallpaperCategory.icon && <span>{wallpaperCategory.icon}</span>}
                                                            <span>{wallpaperCategory.name}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">None</span>
                                                    )}
                                                </td>
                                                <td>{new Date(wallpaper.$createdAt).toLocaleDateString()}</td>
                                                <td>{wallpaper.downloads || 0}</td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <button 
                                                            className={`btn btn-sm ${wallpaper.featured ? 'btn-warning' : 'btn-outline'}`}
                                                            onClick={() => toggleFeatured(wallpaper.$id, wallpaper.featured)}
                                                            title={wallpaper.featured ? "Remove from featured" : "Add to featured"}
                                                        >
                                                            {wallpaper.featured ? '★ Featured' : '☆ Feature'}
                                                        </button>
                                                        <button 
                                                            className="btn btn-sm btn-error"
                                                            onClick={() => handleDelete(wallpaper.$id, wallpaper.imageId)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
              {/* Upload Modal */}
            {showModal && (
                <dialog open className="modal modal-open z-50">
                    <div className="modal-box w-full max-w-md bg-white">
                        <h3 className="font-bold text-lg mb-4">Upload New Wallpaper</h3>
                        
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input 
                                    type="text" 
                                    className="input input-bordered" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                              <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Device Type</span>
                                </label>
                                <select 
                                    className="select select-bordered w-full" 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="phone">Phone Wallpaper</option>
                                    <option value="desktop">Desktop Wallpaper</option>
                                </select>
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select 
                                    className="select select-bordered w-full" 
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="">-- Select a Category --</option>
                                    {categories.map(cat => (
                                        <option key={cat.$id} value={cat.$id}>
                                            {cat.icon && `${cat.icon} `}{cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Wallpaper Image</span>
                                </label>
                                <input 
                                    type="file" 
                                    className="file-input file-input-bordered w-full" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                />
                                {selectedFile && (
                                    <p className="text-xs mt-1">Selected: {selectedFile.name}</p>
                                )}
                            </div>
                            
                            {isUploading && (
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className="bg-primary h-2.5 rounded-full" 
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            )}
                            
                            <div className="modal-action">
                                <button 
                                    type="button" 
                                    className="btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={isUploading}
                                >
                                    {isUploading ? 'Uploading...' : 'Upload'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
                </dialog>
            )}
        </div>
    );
};

export default AdminWallpapers;
