import { useEffect, useContext, useState } from "react";
import ExpenseHeading from "../ExpenseHeading.jsx";
import AddExpense from "./AddExpense.jsx";
import ExpenseList from "./ExpenseList.jsx";
import { expenseListContext, DateDiffContext } from "../../../globalAttributes.jsx";
import DateDetails from "./DateDetails.jsx";

export default function Daily() {
    const { expenseList, setExpenseList } = useContext(expenseListContext);
    const { dateDiff, setDateDiff } = useContext(DateDiffContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showAddExpense, setShowAddExpense] = useState(false);

    const getCurrentDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + dateDiff);
        return date;
    };

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const date = getCurrentDate();
                const res = await fetch("http://localhost:9507/expense/loadExpense", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ date })
                });

                const result = await res.json();
                console.log("Daily API Response:", result);
                
                if (result.statuscode === 200 && Array.isArray(result.data)) {
                    const selectedDate = new Date(date);
                    const filteredData = result.data.filter(expense => {
                        const expenseDate = new Date(expense.createDate);
                        return expenseDate.getFullYear() === selectedDate.getFullYear() &&
                               expenseDate.getMonth() === selectedDate.getMonth() &&
                               expenseDate.getDate() === selectedDate.getDate();
                    });

                    const sortedData = filteredData.sort((a, b) => 
                        new Date(b.createDate) - new Date(a.createDate)
                    );
                    setExpenseList(sortedData);
                } else {
                    setExpenseList([]);
                }
            } catch (error) {
                console.error("Error loading daily expenses:", error);
                setExpenseList([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [dateDiff]);

    const handlePreviousDay = () => {
        setDateDiff(prev => prev - 1);
    };

    const handleNextDay = () => {
        setDateDiff(prev => prev + 1);
    };

    const handleCurrentDay = () => {
        setDateDiff(0);
    };

    const currentDate = getCurrentDate();
    const formattedDate = currentDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="h-full flex flex-col relative">
            <div className="bg-[color:var(--notes-bg)] rounded-lg shadow-md mb-6">
                <div className="flex items-center justify-between p-4">
                    <button 
                        onClick={handlePreviousDay}
                        className="p-2 rounded-lg hover:bg-[color:var(--notes-hover-bg)] text-[color:var(--nav-text)] transition-colors duration-200 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <button 
                        onClick={handleCurrentDay}
                        className="px-4 py-2 text-lg font-semibold text-[color:var(--text-color)] hover:text-[color:var(--primary-btn)] transition-colors duration-200"
                        disabled={isLoading}
                    >
                        {formattedDate}
                    </button>
                    
                    <button 
                        onClick={handleNextDay}
                        className="p-2 rounded-lg hover:bg-[color:var(--notes-hover-bg)] text-[color:var(--nav-text)] transition-colors duration-200 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex gap-6">
                <div className="flex-1 min-h-[500px] bg-[color:var(--notes-bg)] rounded-lg shadow-md p-6 relative">
                    <div className="h-full">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--primary-btn)]"></div>
                                <div className="text-[color:var(--nav-text)] mt-4">
                                    Loading expenses...
                                </div>
                            </div>
                        ) : expenseList && expenseList.length > 0 ? (
                            <div className="space-y-4">
                                {expenseList.map((expense, index) => (
                                    <ExpenseList
                                        key={expense._id || index}
                                        amount={expense.amount}
                                        category={expense.category}
                                        note={expense.note}
                                        time={new Date(expense.createDate).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="text-[color:var(--nav-text)] text-lg font-medium">
                                    No expenses for {formattedDate}
                                </div>
                                <div className="text-[color:var(--nav-text)] text-sm mt-2">
                                    Click the + button to add an expense
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Floating Action Button */}
                    <button
                        onClick={() => setShowAddExpense(true)}
                        className="absolute bottom-6 right-6 w-12 h-12 bg-[color:var(--primary-btn)] hover:bg-[color:var(--primary-btn-hover)] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
                        aria-label="Add expense"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>
                
                <div className="w-80">
                    <DateDetails currentDate={currentDate} />
                </div>
            </div>

            {/* Add Expense Modal */}
            {showAddExpense && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[color:var(--notes-bg)] rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-[color:var(--border-color)]">
                            <h2 className="text-xl font-semibold text-[color:var(--text-color)]">Add Expense</h2>
                            <button
                                onClick={() => setShowAddExpense(false)}
                                className="text-[color:var(--nav-text)] hover:text-[color:var(--text-color)] transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <AddExpense onClose={() => setShowAddExpense(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}