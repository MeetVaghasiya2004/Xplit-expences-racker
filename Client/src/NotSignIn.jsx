import { Link } from 'react-router-dom';
import './index.css';

export default function NotSignIn() {
    return (
        <div className="min-h-screen bg-[color:var(--primary-bg)] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-[color:var(--notes-bg)] rounded-lg shadow-xl overflow-hidden">
                    <div className="p-8 sm:p-10">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-[color:var(--text-color)] mb-2">
                                Welcome to SplitX
                            </h1>
                            <h2 className="text-2xl text-[color:var(--nav-text)] mb-8">
                                Please sign in to continue
                            </h2>
                            
                            <div className="bg-[color:var(--notes-secondary-bg)] rounded-lg p-6 mb-8">
                                <p className="text-[color:var(--text-color)] text-lg leading-relaxed mb-4">
                                    Get access to powerful features:
                                </p>
                                <ul className="text-[color:var(--nav-text)] text-lg space-y-3">
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-[color:var(--primary-btn)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Personal expense tracking
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-[color:var(--primary-btn)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Collaborate with friends
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-[color:var(--primary-btn)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Split bills easily
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-[color:var(--primary-btn)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Share expenses with groups
                                    </li>
                                </ul>
                            </div>
                            
                            <Link 
                                to="/login" 
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[color:var(--primary-btn)] hover:bg-[color:var(--primary-btn-hover)] transition-colors duration-200 shadow-md"
                            >
                                Sign In
                                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}