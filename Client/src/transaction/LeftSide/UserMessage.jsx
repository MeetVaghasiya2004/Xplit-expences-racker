import React, { useContext, useEffect, useState } from "react";
import User from "./User";
import { UserListContext } from "../../../globalAttributes";

export default function UserMessage() {
    const { userList, setUserList } = useContext(UserListContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadUsers = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await fetch("http://localhost:9507/transaction/loadUserList", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to load users');
                }

                const data = await res.json();
                
                if (isMounted) {
                    if (data.success) {
                        setUserList(data.data || []);
                    } else {
                        throw new Error(data.message || 'Failed to load users');
                    }
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error loading users:", error);
                    setError(error.message);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadUsers();

        return () => {
            isMounted = false;
        };
    }, [setUserList]);

    return (
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[color:var(--border-color)] scrollbar-track-transparent hover:scrollbar-thumb-[color:var(--nav-text)]">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full p-2.5">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[color:var(--primary-btn)]"></div>
                    <p className="mt-2.5 text-sm text-[color:var(--nav-text)]">Loading users...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center h-full p-2.5">
                    <p className="text-sm text-red-500 text-center">
                        {error}
                    </p>
                </div>
            ) : userList?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-2.5">
                    <p className="text-sm text-[color:var(--nav-text)] text-center">
                        No users found. Add users to start a transaction.
                    </p>
                </div>
            ) : (
                <div className="space-y-1 p-2.5">
                    {userList.map((user) => (
                        <User 
                            key={user.email} 
                            username={user.username} 
                            email={user.email}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}