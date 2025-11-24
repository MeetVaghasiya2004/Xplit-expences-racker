import React, { useContext } from "react";
import { CurrentTransactionUserContext } from "../../../globalAttributes";

export default function User({ username, email }) {
    const { setCurrentTransactionUser } = useContext(CurrentTransactionUserContext);

    return (
        <button 
            onClick={() => setCurrentTransactionUser({ username, email })} 
            className="w-full p-2 flex items-center gap-3 rounded-lg hover:bg-[color:var(--notes-bg)] transition-colors duration-200 group"
        >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[color:var(--primary-btn)] text-white text-sm group-hover:bg-[color:var(--primary-btn-hover)] transition-colors duration-200">
                {username[0].toUpperCase()}
            </div>
            <div className="flex-1 text-left">
                <h3 className="text-[color:var(--text-color)] text-base">
                    {username}
                </h3>
                <p className="text-xs text-[color:var(--nav-text)]">
                    {email}
                </p>
            </div>
        </button>
    );
}