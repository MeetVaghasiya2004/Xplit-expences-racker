// import ExpenseNavigatorButtons from "../expense/ExpenseNavigatorButtons"
// import {NavLink} from "react-router-dom"
// export default function ExpenseNavigator(){
//     return (
//         <div className="h-[21vh] w-[10vw] flex flex-col gap-2 justify-between mr-4">
//             <NavLink to="/setting/change-password" className={({isActive}) => `${isActive ? "scale-105" : "scale-100"} h-[32%]`}>
//                 <ExpenseNavigatorButtons text="change password"/>
//             </NavLink>
//             <NavLink to="/setting/change-email" className={({isActive}) => `${isActive ? "scale-105" : "scale-100"} h-[32%]`}>
//                 <ExpenseNavigatorButtons text="change email"/>
//             </NavLink>
//             <NavLink to="/setting/logout" className={({isActive}) => `${isActive ? "scale-105" : "scale-100"} h-[32%]`}>
//                 <ExpenseNavigatorButtons text="logout"/>
//             </NavLink>
//         </div>
//     )
// }

import { NavLink } from "react-router-dom";

export default function SettingNavigator() {
    const navItems = [
        { 
            path: "/setting/change-password", 
            text: "Change Password", 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
            )
        },
        { 
            path: "/setting/change-email", 
            text: "Change Email",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        { 
            path: "/setting/logout", 
            text: "Logout",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            )
        }
    ];

    return (
        <nav className="p-6">
            <h2 className="text-lg font-semibold text-[color:var(--text-color)] mb-6">Settings Menu</h2>
            <div className="space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center px-4 py-3 rounded-lg transition-all duration-200
                            ${isActive 
                                ? "bg-[color:var(--primary-btn)] text-white shadow-md" 
                                : "text-[color:var(--nav-text)] hover:bg-[color:var(--notes-hover-bg)]"
                            }
                        `}
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span className="font-medium">{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
