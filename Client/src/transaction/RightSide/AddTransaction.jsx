import React from "react";
import { useContext } from "react";
import { CurrentTransactionUserContext, TransactionListContext } from "../../../globalAttributes.jsx"

export default function AddTransaction() {
    const { currentTransactionUser } = useContext(CurrentTransactionUserContext);
    const { transactionList, setTransactionList } = useContext(TransactionListContext);

    async function handleAddTransaction(e) {
        e.preventDefault();

        const recieverEmail = currentTransactionUser.email;
        const amount = e.target.amount?.value;
        const note = e.target.note?.value;
        const email = localStorage.getItem("email");

        const data = { recieverEmail, amount, note };
        const msg = {
            sendBy: email,
            note,
            amount,
            createdAt: new Date().toString()
        };

        const res = await fetch("http://localhost:9507/transaction/addTransaction", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        setTransactionList([...transactionList, msg]);
        e.target.reset();
    }

    return (
        <div className="bg-[color:var(--notes-bg)] rounded-lg shadow-xl overflow-hidden">
            <div className="bg-[color:var(--notes-secondary-bg)] px-3 py-2 border-b border-[color:var(--border-color)]">
                <h2 className="text-sm text-[color:var(--text-color)]">
                    Add Transaction
                </h2>
            </div>
            
            <div className="p-3">
                <form onSubmit={handleAddTransaction} className="space-y-3">
                    <div>
                        <label htmlFor="amount" className="block text-xs text-[color:var(--nav-text)] mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="Enter amount"
                            required
                            min="0"
                            className="w-full px-3 py-1.5 text-sm rounded-lg bg-[color:var(--notes-secondary-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] placeholder-[color:var(--nav-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="note" className="block text-xs text-[color:var(--nav-text)] mb-1">
                            Note
                        </label>
                        <input
                            type="text"
                            id="note"
                            name="note"
                            placeholder="Enter note"
                            required
                            className="w-full px-3 py-1.5 text-sm rounded-lg bg-[color:var(--notes-secondary-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)] placeholder-[color:var(--nav-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)]"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full px-3 py-1.5 text-sm bg-[color:var(--primary-btn)] text-white rounded-lg hover:bg-[color:var(--primary-btn-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-btn)] focus:ring-offset-2"
                    >
                        Add Transaction
                    </button>
                </form>
            </div>
        </div>
    );
}