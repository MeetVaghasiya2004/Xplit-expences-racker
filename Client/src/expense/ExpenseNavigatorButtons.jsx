// export default function ExpenseNavigatorButtons(props){
//     return (
//         <button className="h-[100%] rounded-md w-[100%] bg-[color:var(--primary-btn)]">{props.text}</button>
//     )   
// }


export default function ExpenseNavigatorButtons({ text, className = '' }) {
    return (
        <div className={`
            w-full py-2 sm:py-3 px-3 sm:px-4 
            font-medium text-center lg:text-left 
            focus:outline-none transition-all duration-300
            ${className}
        `}>
            {text}
        </div>
    )
}
