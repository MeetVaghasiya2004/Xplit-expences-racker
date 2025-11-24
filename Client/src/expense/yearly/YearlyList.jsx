export default function YearlyList({ month, amount, date }) {
    return (
        <div className="bg-[color:var(--notes-bg)] rounded-lg shadow-sm overflow-hidden animate-fade-in">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[color:var(--primary-btn)] text-white font-medium">
                            {month.slice(0, 3)}
                        </div>
                        <span className="text-lg font-medium text-[color:var(--text-color)]">
                            {month}
                        </span>
                    </div>
                    <span className="text-xl font-semibold text-[color:var(--text-color)]">
                        ₹{amount}
                    </span>
                </div>
            </div>
        </div>
    );
} 