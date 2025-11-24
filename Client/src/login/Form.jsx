import InputField from "./InputField";
import FormHeading from "./FormHeading";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthenticationPopup from "./AuthencationPopup.jsx";
import { LoginContext } from "../../globalAttributes.jsx";

export default function Form() {
    const { setIsLoggedIn } = useContext(LoginContext);
    const [showPopup, setShowPopup] = useState(false);
    const [text, setText] = useState("Something went wrong");
    const navigate = useNavigate();

    function handleClose() {
        setShowPopup(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;

        const data = { email, password };

        const res = await fetch("http://localhost:9507/user/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const responseData = await res.json();

        if (!res.ok) {
            setText(responseData.message);
            setShowPopup(true);
        } else {
            setIsLoggedIn(true);
            localStorage.setItem("email", responseData.data.loggedInUser.email);
            navigate("/expense");
        }
    };

    return (
        <div className="bg-[color:var(--notes-bg)] rounded-lg shadow-xl p-8 w-full animate-fade-in">
            <FormHeading text="Welcome Back" />
            <div className="mt-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
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
                    </div>

                    <div>
                        <button 
                            type="submit" 
                            className="w-full bg-[color:var(--primary-btn)] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)] focus:ring-offset-2"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <div className="text-center pt-4 border-t border-[color:var(--border-color)]">
                    <span className="text-[color:var(--nav-text)]">New to Expense Tracker? </span>
                    <NavLink 
                        to="/signup" 
                        className="text-[color:var(--primary-btn)] font-semibold hover:underline"
                    >
                        Create an account
                    </NavLink>
                </div>
            </div>

            {showPopup && (
                <AuthenticationPopup text={text} onClose={handleClose}/>
            )}
        </div>
    );
}

