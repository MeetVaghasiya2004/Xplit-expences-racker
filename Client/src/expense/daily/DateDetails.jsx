import { useContext, useState, useEffect } from "react";
import { DateDiffContext, expenseListContext } from "../../../globalAttributes";

export default function DateDetails({ currentDate }) {
    const { expenseList } = useContext(expenseListContext);
    const [dailySum, setDailySum] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("http://localhost:9507/expense/getDailySum", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ date: currentDate })
                });
                const result = await res.json();
                if (result.statuscode === 200) {
                    setDailySum(result.data.amount || 0);
                } else {
                    setDailySum(0);
                }
            } catch (error) {
                console.error("Error loading daily sum:", error);
                setDailySum(0);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [currentDate]);

    const getHighestExpense = () => {
        if (!Array.isArray(expenseList) || expenseList.length === 0) return 0;
        return Math.max(...expenseList.map(expense => expense?.amount || 0));
    };

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="bg-[color:var(--notes-bg)] rounded-lg p-6 shadow-sm">
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[color:var(--text-color)]">
                        {formattedDate}
                    </h2>
                    <div className="text-sm text-[color:var(--nav-text)]">
                        {Array.isArray(expenseList) ? expenseList.length : 0} expenses
                    </div>
                </div>
                
                <div className="pt-4 border-t border-[color:var(--border-color)]">
                    <div className="flex items-center justify-between">
                        <span className="text-[color:var(--nav-text)]">Total Expenses</span>
                        <span className="text-2xl font-bold text-[color:var(--text-color)]">
                            ₹{isLoading ? '...' : dailySum}
                        </span>
                    </div>
                </div>
                
                <div className="pt-4 border-t border-[color:var(--border-color)]">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-[color:var(--notes-secondary-bg)] rounded-lg">
                            <div className="text-sm text-[color:var(--nav-text)]">Average per expense</div>
                            <div className="text-lg font-semibold text-[color:var(--text-color)]">
                                ₹{isLoading ? '...' : (expenseList.length > 0 ? Math.round(dailySum / expenseList.length) : 0)}
                            </div>
                        </div>
                        <div className="text-center p-3 bg-[color:var(--notes-secondary-bg)] rounded-lg">
                            <div className="text-sm text-[color:var(--nav-text)]">Highest expense</div>
                            <div className="text-lg font-semibold text-[color:var(--text-color)]">
                                ₹{isLoading ? '...' : getHighestExpense()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}