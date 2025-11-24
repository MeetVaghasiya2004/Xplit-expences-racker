import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
    return (
        <form className="flex items-center gap-2">
            <div className="relative flex-1">
                <input
                    type="search"
                    id="search"
                    name="search"
                    autoComplete="off"
                    placeholder="Search users..."
                    className="w-full px-4 py-2 pl-10 rounded-lg bg-[color:var(--notes-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] placeholder-[color:var(--nav-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-[color:var(--nav-text)] w-4 h-4" />
                </div>
            </div>
        </form>
    );
}