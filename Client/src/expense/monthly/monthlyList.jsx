// export default function MonthlyList({ date, amount }) {
//     return (
//         <div className="monthly-item flex justify-between items-center rounded-md bg-[color:var(--notes-secondary-bg)] mt-2 mb-2 w-[90%] p-4 transition-all duration-300 hover:bg-[color:var(--notes-hover-bg)] hover:scale-105 hover:text-black">
//             <span className="date text-lg font-medium">{date}</span>
//             <span className="amount text-lg font-semibold">{amount}</span>
//         </div>
//     )
// }


export default function MonthlyList({ amount, category, note, date }) {
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
            <div className="flex items-center p-4">
                {/* Icon Container */}
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg mr-4 ${categoryStyle.iconBg}`}>
                    <img
                        className="w-8 h-8 object-contain"
                        src={`/Expense/Expense-${category || 'other'}.svg`}
                        alt={category}
                    />
                </div>

                {/* Category and Amount */}
                <div className="flex-1 flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className={`text-base font-medium capitalize ${categoryStyle.textColor}`}>
                            {category || 'Other'}
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
                            {date}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
