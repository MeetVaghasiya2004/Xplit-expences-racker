import InputField from "../../login/InputField";
import SettingHeading from "../SettingHeading";
import AuthenticationPopup from "../../login/AuthencationPopup";
import { useState } from "react";

export default function PasswordChange() {
    const [showPopup, setShowPopup] = useState(false);
    const [text, setText] = useState("something went wrong");

    function handleClose() {
        setShowPopup(false);
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        const oldPassword = e.target.oldPassword.value;
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value; 

        if(newPassword.length < 8) {
            setShowPopup(true);
            setText("Password must be at least 8 characters");
        }
        else if(newPassword !== confirmPassword) {
            setShowPopup(true);
            setText("Passwords do not match");
        }
        else {
            const data = {
                password: oldPassword,
                newPassword,
            };
    
            const res = await fetch("http://localhost:9507/user/changePassword", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await res.json();
        
            setText(responseData.message);
            setShowPopup(true);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[color:var(--text-color)]">Change Password</h2>
                <p className="mt-2 text-sm text-[color:var(--nav-text)]">
                    Please enter your current password and choose a new password to update your credentials.
                </p>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-6">
                <InputField 
                    id="old-password" 
                    name="oldPassword" 
                    type="password" 
                    placeHolder="Current Password"
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--notes-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                />
                <InputField 
                    id="new-password" 
                    name="newPassword" 
                    type="password" 
                    placeHolder="New Password"
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--notes-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                />
                <InputField 
                    id="confirm-password" 
                    name="confirmPassword" 
                    type="password" 
                    placeHolder="Confirm New Password"
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--notes-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                />
                
                <div className="pt-2">
                    <button 
                        type="submit" 
                        className="w-full bg-[color:var(--primary-btn)] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)] focus:ring-offset-2"
                    >
                        Update Password
                    </button>
                </div>
            </form>

            {showPopup && (
                <AuthenticationPopup text={text} onClose={handleClose} />
            )}
        </div>
    );
}