import SettingHeading from "../SettingHeading";
import InputField from "../../login/InputField";
import { useContext, useState } from "react";
import { LoginContext } from "../../../globalAttributes.jsx";
import AuthenticationPopup from "../../login/AuthencationPopup.jsx";

export default function Logout() {
    const { setIsLoggedIn } = useContext(LoginContext);
    const [showPopup, setShowPopup] = useState(false);
    const [text, setText] = useState("something went wrong");

    function handleClose() {
        setShowPopup(false);
    }

    async function handleLogout(e) {
        e.preventDefault();
        const password = e.target.password.value;

        const res = await fetch("http://localhost:9507/user/logOut", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });
        const data = await res.json();

        if(data.success) {
            window.localStorage.removeItem("isDark");
            window.localStorage.removeItem("email");
            setIsLoggedIn(false);
        } else {
            setText(data.message);
            setShowPopup(true);
        }
    }

    return (
        <div className="max-w-xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[color:var(--text-color)]">Sign Out</h2>
                <p className="mt-2 text-sm text-[color:var(--nav-text)]">
                    Please confirm your password to sign out from your account.
                </p>
            </div>

            <div className="bg-[color:var(--notes-bg)] rounded-lg p-6 mb-8 border border-[color:var(--border-color)]">
                <div className="flex items-center justify-center">
                    <svg className="w-12 h-12 text-[color:var(--nav-text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[color:var(--text-color)] text-center">
                    Are you sure you want to sign out?
                </h3>
                <p className="mt-2 text-sm text-[color:var(--nav-text)] text-center">
                    You'll need to sign in again to access your account.
                </p>
            </div>

            <form onSubmit={handleLogout} className="space-y-6">
                <InputField 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeHolder="Confirm with Password"
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--notes-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                />
                
                <div className="flex gap-4">
                    <button 
                        type="button" 
                        onClick={() => window.history.back()}
                        className="flex-1 bg-[color:var(--notes-bg)] text-[color:var(--text-color)] py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:bg-[color:var(--notes-hover-bg)] focus:outline-none focus:ring-2 focus:ring-[color:var(--notes-bg)] focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="flex-1 bg-[color:var(--error-bg)] text-[color:var(--error-text)] py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--error-bg)] focus:ring-offset-2"
                    >
                        Sign Out
                    </button>
                </div>
            </form>

            {showPopup && (
                <AuthenticationPopup text={text} onClose={handleClose} />
            )}
        </div>
    );
}