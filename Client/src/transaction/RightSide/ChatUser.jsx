import React, { useContext } from "react";
import { CurrentTransactionUserContext } from "../../../globalAttributes";

export default function ChatUser() {
    const { currentTransactionUser } = useContext(CurrentTransactionUserContext);
    const isSelected = currentTransactionUser.hasOwnProperty("username");

    return (
        <div className="p-3 bg-[color:var(--notes-secondary-bg)] border-b border-[color:var(--border-color)]">
            {isSelected ? (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[color:var(--primary-btn)] text-white text-sm">
                        {currentTransactionUser.username[0].toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-base text-[color:var(--text-color)]">
                            {currentTransactionUser.username}
                        </h2>
                        <p className="text-xs text-[color:var(--nav-text)]">
                            {currentTransactionUser.email}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="text-center py-2">
                    <p className="text-sm text-[color:var(--nav-text)]">
                        Select a user to view transactions
                    </p>
                </div>
            )}
        </div>
    );
}