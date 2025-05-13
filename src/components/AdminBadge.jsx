import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminBadge = () => {
    const { isAdmin, user } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    
    if (!isAdmin) return null;
    
    return (
        <div className="fixed bottom-4 right-4 z-50">
            {showMenu && (
                <div className="flex flex-col gap-2 mb-2">
                    <Link 
                        to="/admin/wallpapers" 
                        className="btn btn-sm btn-circle btn-secondary"
                        title="Manage Wallpapers"
                        onClick={() => setShowMenu(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </Link>
                    <Link 
                        to="/admin/categories" 
                        className="btn btn-sm btn-circle btn-accent"
                        title="Manage Categories"
                        onClick={() => setShowMenu(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                    </Link>
                </div>
            )}
            
            <button 
                className="btn btn-primary btn-circle transition-all hover:scale-105"
                title={showMenu ? "Close Admin Menu" : "Admin Dashboard"}
                onClick={() => showMenu ? setShowMenu(false) : setShowMenu(true)}
            >
                {showMenu ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                )}
            </button>
            
            {showMenu && (
                <div className="absolute right-0 bottom-16 bg-white shadow-lg rounded-lg p-2 w-max">
                    <Link 
                        to="/admin/dashboard"
                        className="btn btn-sm btn-ghost w-full justify-start"
                        onClick={() => setShowMenu(false)}
                    >
                        Dashboard
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AdminBadge;


