import { Link } from 'react-router-dom';
import '../index.css';

export default function Message() {
    return (
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[color:var(--text-color)] animate-fade-in">
                Welcome to SplitX
            </h1>
            <div className="space-y-4 mb-12">
                <p className="text-lg sm:text-xl text-[color:var(--nav-text)] leading-relaxed">
                    From coffee dates to weekend getaways, capture every moment and expense seamlessly with SplitX, 
                    simplifying shared finances among friends.
                </p>
            </div>
            <div className="space-x-4">
                <Link 
                    to="/signup" 
                    className="inline-flex items-center px-6 py-3 bg-[color:var(--primary-btn)] text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)] focus:ring-offset-2"
                >
                    Get Started
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
                <Link 
                    to="/login" 
                    className="inline-flex items-center px-6 py-3 bg-[color:var(--notes-bg)] text-[color:var(--text-color)] font-semibold rounded-lg shadow-lg hover:bg-[color:var(--notes-secondary-bg)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--notes-bg)] focus:ring-offset-2"
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
}