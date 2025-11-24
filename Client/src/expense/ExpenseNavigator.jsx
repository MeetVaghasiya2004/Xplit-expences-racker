// import ExpenseNavigatorButtons from "./ExpenseNavigatorButtons"
// import {NavLink} from "react-router-dom"
// export default function ExpenseNavigator(){
//     return (
//         <div className="h-[21vh] w-[10vw] flex flex-col justify-between mr-4 gap-2">
//             <NavLink to="/expense/daily" className={({isActive})=> `${isActive ? "scale-105" : "scale-100"} h-[32%]`}>
//                 <ExpenseNavigatorButtons text="Daily"/>
//             </NavLink>
//             <NavLink to="/expense/monthly" className={({isActive})=> `${isActive ? "scale-105" : "scale-100"} h-[32%]`}>
//                 <ExpenseNavigatorButtons text="Monthly"/>
//             </NavLink>
//             <NavLink to="/expense/yearly" className={({isActive})=> `${isActive ? "scale-105" : "scale-100"} h-[32%]`}>
//                 <ExpenseNavigatorButtons text="Yearly"/>
//             </NavLink>
//         </div>
//     )
// }

import { NavLink } from "react-router-dom";

export default function ExpenseNavigator() {
    const navItems = [
        { 
            path: "/expense/daily", 
            text: "Daily Expenses",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        { 
            path: "/expense/monthly", 
            text: "Monthly Overview",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        { 
            path: "/expense/yearly", 
            text: "Yearly Summary",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
            )
        },
        { 
            path: "/expense/analytics", 
            text: "Analytics",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5M8 6v12" />
                </svg>
            )
        }
    ];

    return (
        <nav className="p-6">
            <h2 className="text-lg font-semibold text-[color:var(--text-color)] mb-6">View Options</h2>
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
