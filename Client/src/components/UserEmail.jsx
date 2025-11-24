import { useContext, useEffect, useState } from "react";
import { EmailContext } from "../../globalAttributes.jsx";

export default function UserEmail(){
    const {email, setEmail} = useContext(EmailContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:9507/user/getUser", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await res.json();
                setEmail(data.data.email);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [setEmail]);
    
    if (isLoading) {
        return (
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[color:var(--primary-btn)] animate-pulse"></div>
                <span className="hidden sm:inline text-sm font-medium">Loading...</span>
            </div>
        );
    }

    // Get name from email (everything before @)
    const name = email ? email.split('@')[0] : '';
    // Get first letter of each word in name
    const initials = name
        .split(/[._-]/)
        .map(word => word[0])
        .join('')
        .toUpperCase();

    return (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[color:var(--primary-btn)] flex items-center justify-center text-white font-medium shadow-md">
                {initials || '?'}
            </div>
            <span className="hidden sm:inline text-sm font-medium text-[color:var(--text-color)]">{email}</span>
        </div>
    )
}