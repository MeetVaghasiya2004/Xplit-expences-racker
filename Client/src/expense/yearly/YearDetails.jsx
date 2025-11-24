import { useContext } from "react";
import { expenseListContext } from "../../../globalAttributes.jsx";

export default function YearDetails() {
    const { expenseList } = useContext(expenseListContext);
    
    const calculateTotalExpense = () => {
        if (!expenseList || !expenseList.length) return 0;
        return expenseList.reduce((total, month) => total + month.amount, 0);
    };

    const calculateHighestMonth = () => {
        if (!expenseList || !expenseList.length) return { month: '-', amount: 0 };
        
        const highestMonth = expenseList.reduce((max, month) => 
            month.amount > max.amount ? month : max
        , expenseList[0]);
        
        return {
            month: highestMonth.month,
            amount: highestMonth.amount
        };
    };

    const calculateAveragePerMonth = () => {
        if (!expenseList || !expenseList.length) return 0;
        const total = calculateTotalExpense();
        // Count months with expenses
        const monthsWithExpenses = expenseList.filter(month => month.amount > 0).length;
        return monthsWithExpenses ? Math.round(total / monthsWithExpenses) : 0;
    };

    const currentYear = new Date().getFullYear();
    const highestMonth = calculateHighestMonth();
    const activeMonths = expenseList ? expenseList.filter(month => month.amount > 0).length : 0;

    return (
        <div className="bg-[color:var(--notes-bg)] rounded-lg p-6 shadow-sm">
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[color:var(--text-color)]">
                        Year {currentYear}
                    </h2>
                    <div className="text-sm text-[color:var(--nav-text)]">
                        {activeMonths} active months
                    </div>
                </div>
                
                <div className="pt-4 border-t border-[color:var(--border-color)]">
                    <div className="flex items-center justify-between">
                        <span className="text-[color:var(--nav-text)]">Total Expenses</span>
                        <span className="text-2xl font-bold text-[color:var(--text-color)]">
                            ₹{calculateTotalExpense()}
                        </span>
                    </div>
                </div>
                
                <div className="pt-4 border-t border-[color:var(--border-color)]">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-[color:var(--notes-secondary-bg)] rounded-lg">
                            <div className="text-sm text-[color:var(--nav-text)]">Average per month</div>
                            <div className="text-lg font-semibold text-[color:var(--text-color)]">
                                ₹{calculateAveragePerMonth()}
                            </div>
                        </div>
                        <div className="text-center p-3 bg-[color:var(--notes-secondary-bg)] rounded-lg">
                            <div className="text-sm text-[color:var(--nav-text)]">Highest month</div>
                            <div className="text-lg font-semibold text-[color:var(--text-color)]">
                                ₹{highestMonth.amount}
                            </div>
                            <div className="text-xs text-[color:var(--nav-text)] mt-1">
                                {highestMonth.month}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
