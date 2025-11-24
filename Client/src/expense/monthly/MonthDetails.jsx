import { useContext } from 'react';
import { expenseListContext } from '../../../globalAttributes.jsx';

export default function MonthDetails({ currentDate }) {
    const { expenseList } = useContext(expenseListContext);
    
    const calculateTotalExpense = () => {
        if (!Array.isArray(expenseList)) return 0;
        return expenseList.reduce((total, expense) => total + (expense?.amount || 0), 0);
    };

    // Get days in current month
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getHighestExpense = () => {
        if (!Array.isArray(expenseList) || expenseList.length === 0) return 0;
        return Math.max(...expenseList.map(expense => expense?.amount || 0));
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const totalExpense = calculateTotalExpense();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    return (
        <div className="bg-[color:var(--notes-bg)] rounded-lg p-6 shadow-sm">
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[color:var(--text-color)]">
                        {monthName} {year}
                    </h2>
                    <div className="text-sm text-[color:var(--nav-text)]">
                        {Array.isArray(expenseList) ? expenseList.length : 0} expenses
                    </div>
                </div>
                
                <div className="pt-4 border-t border-[color:var(--border-color)]">
                    <div className="flex items-center justify-between">
                        <span className="text-[color:var(--nav-text)]">Total Expenses</span>
                        <span className="text-2xl font-bold text-[color:var(--text-color)]">
                            ₹{totalExpense}
                        </span>
                    </div>
                </div>
                
                <div className="pt-4 border-t border-[color:var(--border-color)]">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-[color:var(--notes-secondary-bg)] rounded-lg">
                            <div className="text-sm text-[color:var(--nav-text)]">Average per day</div>
                            <div className="text-lg font-semibold text-[color:var(--text-color)]">
                                ₹{Math.round(totalExpense / daysInMonth)}
                            </div>
                        </div>
                        <div className="text-center p-3 bg-[color:var(--notes-secondary-bg)] rounded-lg">
                            <div className="text-sm text-[color:var(--nav-text)]">Highest expense</div>
                            <div className="text-lg font-semibold text-[color:var(--text-color)]">
                                ₹{getHighestExpense()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
