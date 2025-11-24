import { useState, useContext, useEffect } from 'react';
import { expenseListContext } from '../../../globalAttributes.jsx';

const EXPENSE_CATEGORIES = [
    'Food', 'Transport', 'Shopping', 'Entertainment', 
    'Health', 'Education', 'Bills', 'Other'
];

export default function AddMonthlyExpense({ currentDate }) {
    const { expenseList, setExpenseList } = useContext(expenseListContext);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        category: 'Other',
        note: '',
        date: currentDate.toISOString().split('T')[0]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:9507/expense/addExpense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    amount: formData.amount,
                    category: formData.category,
                    note: formData.note,
                    createDate: formData.date
                })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.statusCode === 200) {
                    setExpenseList([result.data, ...expenseList]);
                    setFormData({
                        amount: '',
                        category: 'Other',
                        note: '',
                        date: currentDate.toISOString().split('T')[0]
                    });
                    setIsOpen(false);
                }
            }
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    // Reset form data when current date changes
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            date: currentDate.toISOString().split('T')[0]
        }));
    }, [currentDate]);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[color:var(--primary-btn)] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-[color:var(--notes-bg)] rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-[color:var(--text-color)]">
                                Add Expense for {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </h2>
                            <button onClick={() => setIsOpen(false)} className="text-[color:var(--nav-text)]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[color:var(--nav-text)] mb-1">
                                    Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                                    className="w-full p-2 rounded-md bg-[color:var(--notes-secondary-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[color:var(--nav-text)] mb-1">
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full p-2 rounded-md bg-[color:var(--notes-secondary-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)]"
                                >
                                    {EXPENSE_CATEGORIES.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[color:var(--nav-text)] mb-1">
                                    Note
                                </label>
                                <textarea
                                    value={formData.note}
                                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                    className="w-full p-2 rounded-md bg-[color:var(--notes-secondary-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)]"
                                    rows="3"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[color:var(--nav-text)] mb-1">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full p-2 rounded-md bg-[color:var(--notes-secondary-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)]"
                                    required
                                    min={`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-01`}
                                    max={`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()).padStart(2, '0')}`}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[color:var(--primary-btn)] text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                            >
                                Add Expense
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
} 