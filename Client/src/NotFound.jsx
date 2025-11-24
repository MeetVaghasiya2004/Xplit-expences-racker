import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[color:var(--primary-bg)] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                <div className="bg-[color:var(--notes-bg)] rounded-lg shadow-xl overflow-hidden">
                    <div className="p-8 sm:p-10 text-center">
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[color:var(--notes-secondary-bg)] mb-6">
                                <span className="text-5xl font-bold text-[color:var(--primary-btn)]">
                                    404
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-[color:var(--text-color)] mb-4">
                                Page Not Found
                            </h1>
                            <p className="text-[color:var(--nav-text)] text-lg mb-8">
                                The page you're looking for doesn't exist or has been moved.
                            </p>
                        </div>
                        
                        <Link 
                            to="/" 
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[color:var(--primary-btn)] hover:bg-[color:var(--primary-btn-hover)] transition-colors duration-200 shadow-md"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

