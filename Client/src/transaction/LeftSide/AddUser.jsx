import React, { useState, useContext } from "react"
import { UserListContext } from "../../../globalAttributes.jsx"
import { TransactionListContext } from "../../../globalAttributes.jsx"
import { useNavigate } from "react-router-dom"

export default function AddUser() {
    const { userList, setUserList } = useContext(UserListContext);
    const [showPopup, setShowPopup] = useState(false);
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setSelectedUser } = useContext(TransactionListContext);

    async function handleAddUser(e) {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        const email = e.target.email.value;
        
        try {
            let userAlreadyAdded = userList.some(user => user.email === email);
            
            if (userAlreadyAdded) {
                setText("Email is already added");
                setShowPopup(true);
            } else {
                const res = await fetch("http://localhost:9507/transaction/verifyAddUser", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
        
                const data = await res.json();
                if (data.success) {
                    setUserList(prev => [...prev, { username: data.data.username, email }]);
                    setSelectedUser(data.data);
                    navigate("/transaction");
                } else {
                    setError(data.message || "User not Found");
                    setShowPopup(true);
                }
            }
        } catch (err) {
            setError(err.message || "Error adding user");
            setShowPopup(true);
        } finally {
            setIsLoading(false);
        }
    }

    function closePopup() {
        setShowPopup(false);
    }

    return (
        <div className="relative">
            <form onSubmit={handleAddUser} className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        className="flex-1 px-3 py-1.5 text-sm border border-[color:var(--border-color)] rounded-md bg-[color:var(--notes-secondary-bg)] text-[color:var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-3 py-1.5 text-sm bg-[color:var(--primary-btn)] text-white rounded-md hover:bg-[color:var(--primary-btn-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Adding..." : "Add"}
                    </button>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
            </form>
            
            {showPopup && (
                <div className="absolute bottom-full left-0 right-0 mb-2">
                    <div className="bg-[color:var(--notes-bg)] rounded-lg shadow-lg p-2.5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[color:var(--text-color)]">{text}</p>
                            <button 
                                onClick={closePopup}
                                className="ml-2.5 text-[color:var(--nav-text)] hover:text-[color:var(--text-color)] transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}