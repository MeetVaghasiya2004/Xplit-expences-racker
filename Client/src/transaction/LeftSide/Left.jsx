import React from "react";
import Search from "./Search";
import UserMessage from "./UserMessage";
import AddUser from "./AddUser";

export default function Left() {
    return (
        <div className="h-full bg-[color:var(--notes-secondary-bg)] rounded-lg flex flex-col">
            <div className="shrink-0 p-2.5 border-b border-[color:var(--border-color)]">
                <AddUser />
            </div>
            <div className="shrink-0 p-2.5 border-b border-[color:var(--border-color)]">
                <Search />
            </div>
            <div className="flex-1 overflow-hidden">
                <UserMessage />
            </div>
        </div>
    );
}