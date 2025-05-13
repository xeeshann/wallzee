import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import adminService from '../../appwrite/admin';
import { ID } from 'appwrite';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
    
    // Form state
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryIcon, setCategoryIcon] = useState('');
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    
    const { user } = useAuth();

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const categoriesList = await adminService.getAllCategories();
            setCategories(categoriesList);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!categoryName.trim()) {
            setError('Please enter a category name');
            return;
        }
        
        try {
            if (modalMode === 'create') {
                await adminService.createCategory(
                    categoryName,
                    categoryDescription,
                    categoryIcon
                );
            } else {
                await adminService.updateCategory(
                    currentCategoryId,
                    categoryName,
                    categoryDescription,
                    categoryIcon
                );
            }
            
            // Reset form
            setCategoryName('');
            setCategoryDescription('');
            setCategoryIcon('');
            setCurrentCategoryId(null);
            setShowModal(false);
            
            // Refresh categories list
            fetchCategories();
            
        } catch (error) {
            console.error('Save error:', error);
            setError(`Failed to ${modalMode === 'create' ? 'create' : 'update'} category: ${error.message}`);
        }
    };
    
    const handleEdit = (category) => {
        setCategoryName(category.name);
        setCategoryDescription(category.description || '');
        setCategoryIcon(category.icon || '');
        setCurrentCategoryId(category.$id);
        setModalMode('edit');
        setShowModal(true);
    };
    
    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete category "${name}"? This will NOT delete the associated wallpapers.`)) {
            return;
        }
        
        try {
            await adminService.deleteCategory(id);
            
            // Update state
            setCategories(categories.filter(cat => cat.$id !== id));
            
        } catch (error) {
            console.error('Delete error:', error);
            setError('Failed to delete category: ' + error.message);
        }
    };
    
    const openCreateModal = () => {
        setCategoryName('');
        setCategoryDescription('');
        setCategoryIcon('');
        setCurrentCategoryId(null);
        setModalMode('create');
        setShowModal(true);
    };

    // Common emojis for category icons
    const commonEmojis = ['🏞️', '🌄', '🌃', '🌅', '🌌', '🖼️', '🌈', '🎨', '🔮', '🎭', '🎪', '🎠', '🏙️', '🌉', '🌆', '🌇', '🗿', '🏰', '🕌', '⛩️', '🏯', '🏛️', '🏗️'];

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
                                <Link to="/admin/categories" className="active">
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
                        <h1 className="text-2xl font-bold">Manage Categories</h1>
                        <button 
                            className="btn btn-primary"
                            onClick={openCreateModal}
                        >
                            Add New Category
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
                    ) : categories.length === 0 ? (
                        <div className="text-center py-8 bg-white rounded-lg shadow">
                            <h3 className="text-lg font-medium">No categories found</h3>
                            <p className="mt-2 text-gray-500">Create your first category by clicking the button above.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Icon</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Wallpapers</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map(category => (
                                        <tr key={category.$id}>
                                            <td>
                                                <div className="text-2xl">
                                                    {category.icon || '🌄'}
                                                </div>
                                            </td>
                                            <td>{category.name}</td>
                                            <td>
                                                {category.description ? (
                                                    <span className="text-sm">{category.description}</span>
                                                ) : (
                                                    <span className="text-sm text-gray-400">No description</span>
                                                )}
                                            </td>
                                            <td>
                                                <span className="badge badge-ghost">{category.wallpaperCount || 0}</span>
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button 
                                                        className="btn btn-sm btn-outline"
                                                        onClick={() => handleEdit(category)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-error"
                                                        onClick={() => handleDelete(category.$id, category.name)}
                                                        disabled={category.wallpaperCount > 0}
                                                        title={category.wallpaperCount > 0 ? "Cannot delete category with wallpapers" : "Delete category"}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
              {/* Category Modal */}
            {showModal && (
                <dialog open className="modal modal-open z-50">
                    <div className="modal-box w-full max-w-md bg-white">
                        <h3 className="font-bold text-lg mb-4">
                            {modalMode === 'create' ? 'Add New Category' : 'Edit Category'}
                        </h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    className="input input-bordered" 
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description (Optional)</span>
                                </label>
                                <textarea 
                                    className="textarea textarea-bordered" 
                                    value={categoryDescription}
                                    onChange={(e) => setCategoryDescription(e.target.value)}
                                    rows={3}
                                />
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Icon (Emoji)</span>
                                </label>
                                <div className="flex gap-2 flex-wrap mt-1 mb-2">
                                    {commonEmojis.map(emoji => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            className={`btn btn-sm ${categoryIcon === emoji ? 'btn-primary' : 'btn-ghost'}`}
                                            onClick={() => setCategoryIcon(emoji)}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                                <input 
                                    type="text" 
                                    className="input input-bordered" 
                                    value={categoryIcon}
                                    onChange={(e) => setCategoryIcon(e.target.value)}
                                    placeholder="Enter emoji or leave blank"
                                />
                            </div>
                            
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
                                >
                                    {modalMode === 'create' ? 'Create Category' : 'Update Category'}
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

export default AdminCategories;