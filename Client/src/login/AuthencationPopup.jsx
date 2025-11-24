import { useEffect } from "react";

export default function AuthenticationPopup({ text, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-4 right-4 w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] max-w-[400px] bg-[color:var(--error-bg)] text-[color:var(--error-text)] flex items-center gap-3 rounded-lg z-50 shadow-xl p-4 animate-slide-up">
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">{text}</span>
            <button onClick={onClose} className="ml-auto text-[color:var(--error-text)] hover:opacity-70">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}

