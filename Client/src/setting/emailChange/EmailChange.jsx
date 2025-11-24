import SettingHeading from "../SettingHeading";
import InputField from "../../login/InputField";
import { useState, useContext } from "react";
import AuthenticationPopup from "../../login/AuthencationPopup";
import { EmailContext } from "../../../globalAttributes.jsx";

export default function EmailChange() {
    const { email, setEmail } = useContext(EmailContext);
    const [showPopup, setShowPopup] = useState(false);
    const [text, setText] = useState("something went wrong");

    function handleClose() {
        setShowPopup(false);
    }

    const handleEmailChange = async (e) => {
        e.preventDefault();
        
        const newEmail = e.target.newEmail.value;
        const password = e.target.password.value;

        const data = {
            newEmail,
            password,
        };

        if(newEmail === email) {
            setText("You are already using this email");
            setShowPopup(true);
        } else {
            const res = await fetch("http://localhost:9507/user/changeEmail", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await res.json();
            
            if(res.ok) {
                setText(`Email is changed from ${email} to ${newEmail} !`);
                setShowPopup(true);
                setEmail(newEmail);
            } else {
                setText(responseData.message);
                setShowPopup(true);
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[color:var(--text-color)]">Change Email Address</h2>
                <p className="mt-2 text-sm text-[color:var(--nav-text)]">
                    Update your email address. Please enter your password to confirm this change.
                </p>
            </div>

            <form onSubmit={handleEmailChange} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-[color:var(--nav-text)] mb-2">
                        Current Email
                    </label>
                    <div className="px-4 py-3 rounded-lg bg-[color:var(--notes-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)]">
                        {email}
                    </div>
                </div>

                <InputField 
                    id="new-email" 
                    name="newEmail" 
                    type="email" 
                    placeHolder="New Email Address"
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--notes-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                />
                
                <InputField 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeHolder="Confirm with Password"
                    className="w-full px-4 py-3 rounded-lg bg-[color:var(--notes-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                />
                
                <div className="pt-2">
                    <button 
                        type="submit" 
                        className="w-full bg-[color:var(--primary-btn)] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)] focus:ring-offset-2"
                    >
                        Update Email Address
                    </button>
                </div>
            </form>

            {showPopup && (
                <AuthenticationPopup text={text} onClose={handleClose} />
            )}
        </div>
    );
}