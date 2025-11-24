import Button from "./Button.jsx"
import Logo from "./Logo.jsx"
import Mode from "./Mode.jsx"
import UserEmail from "./UserEmail.jsx"
import {GlobalContext,LoginContext} from '../../globalAttributes.jsx';
import { useContext } from 'react';
import { NavLink } from "react-router-dom";

export default function Header(){
    const { isDark } = useContext(GlobalContext);
    const {isLoggedIn} = useContext(LoginContext);

    return(
        <header className="bg-[color:var(--notes-bg)] border-b border-[color:var(--border-color)] fixed top-0 left-0 right-0 z-50 shadow-md backdrop-blur-sm bg-opacity-90">
            <div className="container-custom h-[10vh]">
                <div className="flex-between h-full">
                    <Logo />
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Mode />
                        {isLoggedIn ? (
                            <UserEmail />
                        ) : (
                            <div className="flex gap-2 sm:gap-4">
                                <NavLink to="/login">
                                    <Button text="Login" className="btn-primary"/>
                                </NavLink>
                                <NavLink to="/signup">
                                    <Button text="Signup" className="btn-outline"/>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}