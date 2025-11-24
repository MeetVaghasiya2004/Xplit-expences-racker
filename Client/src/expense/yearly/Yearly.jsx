import { useEffect, useState } from "react";

export default function Yearly() {
    const [yearlyData, setYearlyData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [yearTotal, setYearTotal] = useState(0);
    const currentYear = new Date().getFullYear();

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        const loadYearlyData = async () => {
            setIsLoading(true);
            try {
                const monthlyTotals = [];
                let total = 0;

                for (let month = 0; month < 12; month++) {
                    const date = new Date(currentYear, month, 1);
                    const res = await fetch("http://localhost:9507/expense/loadExpense", {
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ date })
                    });
                    const result = await res.json();
                    
                    const monthTotal = result.statuscode === 200 && Array.isArray(result.data)
                        ? result.data.reduce((sum, expense) => sum + (expense?.amount || 0), 0)
                        : 0;

                    monthlyTotals.push({
                        month: months[month],
                        amount: monthTotal,
                        hasExpenses: monthTotal > 0
                    });

                    total += monthTotal;
                }

                setYearlyData(monthlyTotals);
                setYearTotal(total);
            } catch (error) {
                console.error("Error loading yearly data:", error);
                setYearlyData([]);
                setYearTotal(0);
            } finally {
                setIsLoading(false);
            }
        };

        loadYearlyData();
    }, []);

    return (
        <div className="h-full flex flex-col">
            <div className="bg-[color:var(--notes-bg)] rounded-lg shadow-md mb-6">
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-2xl font-semibold text-[color:var(--text-color)]">
                        Yearly Overview
                    </h2>
                    <div className="px-4 py-2 bg-[color:var(--notes-secondary-bg)] rounded-lg">
                        <span className="text-lg font-medium text-[color:var(--text-color)]">
                            {currentYear}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex gap-6">
                <div className="flex-1 min-h-[500px] bg-[color:var(--notes-bg)] rounded-lg shadow-md p-6">
                    <div className="h-full">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--primary-btn)]"></div>
                                <div className="text-[color:var(--nav-text)] mt-4">
                                    Loading yearly data...
                                </div>
                            </div>
                        ) : yearlyData.length > 0 ? (
                            <div className="space-y-4">
                                {yearlyData.map((monthData, index) => (
                                    <div 
                                        key={monthData.month}
                                        className={`flex items-center justify-between p-4 rounded-lg transition-colors duration-200 ${
                                            monthData.hasExpenses 
                                                ? 'bg-[color:var(--notes-secondary-bg)] hover:bg-[color:var(--notes-hover-bg)]' 
                                                : 'bg-[color:var(--notes-secondary-bg)] bg-opacity-50'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <span className="w-8 text-[color:var(--nav-text)] text-sm font-medium">
                                                {(index + 1).toString().padStart(2, '0')}
                                            </span>
                                            <span className={`text-lg ${
                                                monthData.hasExpenses 
                                                    ? 'text-[color:var(--text-color)] font-medium' 
                                                    : 'text-[color:var(--nav-text)]'
                                            }`}>
                                                {monthData.month}
                                            </span>
                                        </div>
                                        <span className={`text-lg ${
                                            monthData.hasExpenses 
                                                ? 'text-[color:var(--text-color)] font-semibold' 
                                                : 'text-[color:var(--nav-text)]'
                                        }`}>
                                            ₹{monthData.amount.toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="text-[color:var(--nav-text)] text-lg font-medium">
                                    No expenses recorded for {currentYear}
                                </div>
                                <div className="text-[color:var(--nav-text)] text-sm mt-2">
                                    Start adding expenses to see your yearly summary
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-80">
                    <div className="bg-[color:var(--notes-bg)] rounded-lg shadow-md p-6">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-[color:var(--text-color)] mb-2">
                                    Year Summary
                                </h3>
                                <div className="text-sm text-[color:var(--nav-text)]">
                                    Overview of your expenses in {currentYear}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[color:var(--border-color)]">
                                <div className="flex items-center justify-between">
                                    <span className="text-[color:var(--nav-text)]">Total Expenses</span>
                                    <span className="text-2xl font-bold text-[color:var(--text-color)]">
                                        ₹{yearTotal.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-[color:var(--notes-secondary-bg)] rounded-lg">
                                    <div className="text-sm text-[color:var(--nav-text)]">Monthly Average</div>
                                    <div className="text-lg font-semibold text-[color:var(--text-color)] mt-1">
                                        ₹{Math.round(yearTotal / 12).toLocaleString()}
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-[color:var(--notes-secondary-bg)] rounded-lg">
                                    <div className="text-sm text-[color:var(--nav-text)]">Active Months</div>
                                    <div className="text-lg font-semibold text-[color:var(--text-color)] mt-1">
                                        {yearlyData.filter(m => m.hasExpenses).length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
