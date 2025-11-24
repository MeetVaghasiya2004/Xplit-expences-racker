import InputField from "../login/InputField.jsx";
import FormHeading from "../login/FormHeading.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthenticationPopup from "../login/AuthencationPopup.jsx";

export default function Form() {
    const [showPopup, setShowPopup] = useState(false);
    const [text, setText] = useState("Something went wrong");
    const navigate = useNavigate();

    function handleClose() {
        setShowPopup(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let name = e.target.name.value;
        let email = e.target.email.value;
        let password = e.target.password.value;
        let confirmPassword = e.target.confirmPassword.value;

        if (password.length < 8) {
            setText("Password should contain at least 8 characters!");
            setShowPopup(true);
        } else if (password !== confirmPassword) {
            setText("Passwords do not match!");
            setShowPopup(true);
        } else {
            const data = { name, email, password };

            const res = await fetch("http://localhost:9507/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseData = await res.json();

            if (!res.ok) {
                setText(responseData.message);
                setShowPopup(true);
            } else {
                navigate("/login");
            }
        }
    };

    return (
        <div className="p-8 sm:p-10">
            <FormHeading text="Create Account" />
            <div className="mt-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <InputField 
                            id="userName" 
                            name="name" 
                            type="text" 
                            placeHolder="Enter your Name"
                            className="w-full px-4 py-3 rounded-lg bg-[color:var(--notes-secondary-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                        />
                        <InputField 
                            id="userEmail" 
                            name="email" 
                            type="email" 
                            placeHolder="Enter your Email"
                            className="w-full px-4 py-3 rounded-lg bg-[color:var(--notes-secondary-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                        />
                        <InputField 
                            id="userPassword" 
                            name="password" 
                            type="password" 
                            placeHolder="Enter Password"
                            className="w-full px-4 py-3 rounded-lg bg-[color:var(--notes-secondary-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                        />
                        <InputField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            placeHolder="Confirm Password"
                            className="w-full px-4 py-3 rounded-lg bg-[color:var(--notes-secondary-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                        />
                    </div>

                    <div>
                        <button 
                            type="submit" 
                            className="w-full bg-[color:var(--primary-btn)] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)] focus:ring-offset-2"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                <div className="text-center pt-4 border-t border-[color:var(--border-color)]">
                    <span className="text-[color:var(--nav-text)]">Already have an account? </span>
                    <NavLink 
                        to="/login" 
                        className="text-[color:var(--primary-btn)] font-semibold hover:underline"
                    >
                        Sign in
                    </NavLink>
                </div>
            </div>

            {showPopup && <AuthenticationPopup text={text} onClose={handleClose} />}
        </div>
    );
}
