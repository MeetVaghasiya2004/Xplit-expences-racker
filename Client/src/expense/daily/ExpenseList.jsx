// export default function ExpenseList({icon,amount, category,note,time}){
//     return (
//         <div className="flex flex-col items-center rounded-md bg-[color:var(--notes-bg)] mt-2 mb-2 w-[90%]">
//             <div className="flex w-[100%] h-[50px]">
//                 <div className="h-[100%] w-[20%] flex justify-center items-center">
//                     <img className="h-[90%] bg-[color:var(--primary-btn)] p-[10%] rounded-lg" src={`/Expense/Expense-${category}.svg`} alt="" />
//                 </div>
//                 <div className="w-[48%] h-[100%] truncate hover:text-ellipsis flex items-center text-lg">{category}</div>
//                 <span className="w-[32%] text-xl text-center flex items-center text-lg">{amount}</span>
//             </div>
//             {note ? <span className="w-[100%] bg-[color:var(--notes-secondary-bg)] p-2 h-auto">{note}</span> :null}
//             <div className="text-[80%] bg-[color:var(--notes-secondary-bg)] w-[100%] rounded-b-md text-end pr-3">{time}</div>
//         </div>
//     )
// }



export default function ExpenseList({ amount, category, note, time }) {
    // Get category-specific styles
    const getCategoryStyles = (category) => {
        const styles = {
            health: {
                iconBg: 'bg-[#4ade80] bg-opacity-20',
                textColor: 'text-[#4ade80]'
            },
            food: {
                iconBg: 'bg-[#f97316] bg-opacity-20',
                textColor: 'text-[#f97316]'
            },
            travel: {
                iconBg: 'bg-[#06b6d4] bg-opacity-20',
                textColor: 'text-[#06b6d4]'
            },
            shop: {
                iconBg: 'bg-[#8b5cf6] bg-opacity-20',
                textColor: 'text-[#8b5cf6]'
            },
            rent: {
                iconBg: 'bg-[#ec4899] bg-opacity-20',
                textColor: 'text-[#ec4899]'
            },
            other: {
                iconBg: 'bg-[#64748b] bg-opacity-20',
                textColor: 'text-[#64748b]'
            }
        };
        return styles[category] || styles.other;
    };

    const categoryStyle = getCategoryStyles(category);

    return (
        <div className="bg-[color:var(--nav-bg)] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[color:var(--nav-1-bg)]">
            {/* Main Content */}
            <div className="flex items-center p-4">
                {/* Icon Container */}
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg mr-4 ${categoryStyle.iconBg}`}>
                    <img
                        className="w-8 h-8 object-contain"
                        src={`/Expense/Expense-${category}.svg`}
                        alt={category}
                    />
                </div>

                {/* Category and Amount */}
                <div className="flex-1 flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className={`text-base font-medium capitalize ${categoryStyle.textColor}`}>
                            {category}
                        </div>
                        {note && (
                            <div className="text-sm text-[color:var(--nav-text)] mt-0.5 line-clamp-1">
                                {note}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-lg font-semibold text-[color:var(--text-color)]">
                            ₹{amount}
                        </span>
                        <span className="text-xs text-[color:var(--nav-text)] mt-0.5">
                            {time}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}