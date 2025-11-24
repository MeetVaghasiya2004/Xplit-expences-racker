import React from "react";
import ChatUser from "./ChatUser";
import Messages from "./Messages";

export default function Right() {
    return (
        <div className="h-[calc(100vh-7rem)] bg-[color:var(--notes-secondary-bg)] rounded-lg overflow-hidden flex flex-col relative">
            <div className="shrink-0 border-b border-[color:var(--border-color)]">
                <ChatUser />
            </div>
            <div className="min-h-0 flex-1">
                <Messages />
            </div>
            <button
                className="absolute bottom-6 right-6 w-11 h-11 bg-[color:var(--primary-btn)] text-white rounded-full shadow-lg hover:bg-[color:var(--primary-btn-hover)] hover:scale-105 transition-all duration-200 flex items-center justify-center"
                aria-label="Add transaction"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
        </div>
    );
}