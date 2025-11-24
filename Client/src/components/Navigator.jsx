import NavigatorButton from "./NavigatorButton.jsx"
import {GlobalContext,LoginContext} from '../../globalAttributes.jsx';
import { useContext } from "react";
import { NavLink } from "react-router-dom";

export default function Navigator(){
    const { isDark } = useContext(GlobalContext);
    const {isLoggedIn} = useContext(LoginContext);

    if (!isLoggedIn) return null;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[color:var(--primary-bg)] py-2">
            <div className="container-custom">
                <div className="bg-[color:var(--nav-bg)] rounded-2xl shadow-lg p-2 flex justify-around items-center">
                    <NavLink 
                        to="/expense" 
                        className={({isActive}) => `
                            flex-1 flex items-center justify-center p-3 rounded-xl transition-all duration-300
                            ${isActive 
                                ? "bg-primary/10 text-primary" 
                                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                            }
                        `}
                    >
                        <NavigatorButton 
                            src={`${isDark ? "../../images/expense-white.svg" : "../../images/expense-black.svg"}`} 
                            alt="expense"
                        />
                    </NavLink>
                    <NavLink 
                        to="/transaction" 
                        className={({isActive}) => `
                            flex-1 flex items-center justify-center p-3 rounded-xl transition-all duration-300
                            ${isActive 
                                ? "bg-primary/10 text-primary" 
                                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                            }
                        `}
                    >
                        <NavigatorButton 
                            src={`${isDark ? "../../images/transact-white.svg" : "../../images/transact-black.svg"}`} 
                            alt="transaction"
                        />
                    </NavLink>
                    <NavLink 
                        to="/setting" 
                        className={({isActive}) => `
                            flex-1 flex items-center justify-center p-3 rounded-xl transition-all duration-300
                            ${isActive 
                                ? "bg-primary/10 text-primary" 
                                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                            }
                        `}
                    >
                        <NavigatorButton 
                            src={`${isDark ? "../../images/setting-white.svg": "../../images/setting-black.svg"}`} 
                            alt="setting"
                        />
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}