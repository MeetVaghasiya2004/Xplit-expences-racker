// export default function InputField(props) {
//     return (
//         <div className="flex flex-col gap-1 items-center w-full max-w-[80%]">
//             <label htmlFor={props.id} className="text-md font-semibold text-color">{props.name}</label>
//             <input
//                 required={props.required || false}
//                 id={props.id}
//                 name={props.name}
//                 min={props.isLimit ? "1" : ""}
//                 max={props.isLimit ? "999999999" : ""}
//                 className="p-2 border border-gray-300 rounded-md text-center text-black w-full focus:ring-2 focus:ring-blue-300 focus:outline-none"
//                 type={props.type}
//                 placeholder={props.placeHolder}
//             />
//         </div>
//     );
// }


import React from 'react';

export default function InputField({ id, name, type, placeHolder, isLimit, required, className }) {
    return (
        <div>
            {/* Label */}
            <label htmlFor={id} className="block text-sm font-medium text-[color:var(--nav-text)] mb-1">{placeHolder}</label>

            {/* Input */}
            <input
                required={required || false}
                id={id}
                name={name}
                type={type}
                placeholder={placeHolder}
                min={isLimit ? "1" : ""}
                max={isLimit ? "999999999" : ""}
                className={className || "w-full px-4 py-3 rounded-lg bg-[color:var(--notes-secondary-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"}
                aria-label={placeHolder}
            />
        </div>
    );
}