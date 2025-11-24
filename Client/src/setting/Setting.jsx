// import { Outlet } from "react-router-dom"
// import SettingNavigator from "./SettingNavigator";

// export default function Setting(){
//     return (
//         <div className="h-[80vh] bg-[color:var(--primary-bg)] flex justify-center items-center ">
//             <div className="h-[70vh] flex w-[100%] justify-center drop-shadow-lg">
//                 <SettingNavigator />
//                 <Outlet />
//             </div>
//         </div>
//     )
// }

import { Outlet } from "react-router-dom"
import SettingNavigator from "./SettingNavigator";

export default function Setting() {
    return (
        <div className="min-h-screen bg-[color:var(--primary-bg)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-[color:var(--text-color)] mb-8 text-center"></h1>
                <div className="bg-[color:var(--notes-bg)] rounded-xl shadow-xl overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-[color:var(--border-color)] bg-[color:var(--notes-secondary-bg)]">
                            <SettingNavigator />
                        </div>
                        <div className="flex-1 p-6 md:p-8">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}