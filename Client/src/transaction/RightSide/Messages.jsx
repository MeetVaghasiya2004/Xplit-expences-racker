import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from "react";
import Message from "./Message";
import { CurrentTransactionUserContext, SocketContext, TransactionListContext } from "../../../globalAttributes";

export default function Messages() {
    const { currentTransactionUser } = useContext(CurrentTransactionUserContext);
    const { transactionList, setTransactionList } = useContext(TransactionListContext);
    const { socket } = useContext(SocketContext);

    const [isListenerBound, setIsListenerBound] = useState(false);
    const messageContainerRef = useRef(null);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const convertToIST = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {
        if (socket && !isListenerBound) {
            socket.on("transaction-added", (data) => {
                setTransactionList((prev) => [...prev, data]);
            });
            setIsListenerBound(true);
        }
    }, [socket, isListenerBound]);

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            try {
                const res = await fetch("http://localhost:9507/transaction/loadTransactions", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ recieverEmail: currentTransactionUser.email })
                });
                const data = await res.json();
                setTransactionList(data.data || []);
            } catch (error) {
                console.error("Error loading transactions:", error);
            } finally {
                setIsLoading(false);
            }
        }

        if (currentTransactionUser.hasOwnProperty("username")) {
            loadData();
        }
    }, [currentTransactionUser]);

    useLayoutEffect(() => {
        setTimeout(() => {
            if (messageContainerRef.current) {
                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
            }
        }, 0);
    }, [transactionList]);

    useEffect(() => {
        filterTransactions();
    }, [startDate, endDate, transactionList]);

    const filterTransactions = () => {
        if (!Array.isArray(transactionList)) return;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const filtered = transactionList.filter(transaction => {
            const transactionDate = new Date(transaction.createdAt);
            return (!startDate || transactionDate >= start) && (!endDate || transactionDate <= end);
        });
        setFilteredTransactions(groupTransactionsByDate(filtered));
    };

    const groupTransactionsByDate = (transactions) => {
        const grouped = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(transaction);
            return acc;
        }, {});
        return Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b)).map(date => ({ date, transactions: grouped[date] }));
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div 
                ref={messageContainerRef}
                className="min-h-0 flex-1 overflow-y-auto px-4 py-3 pb-20 scrollbar-thin scrollbar-thumb-[color:var(--border-color)] scrollbar-track-transparent hover:scrollbar-thumb-[color:var(--nav-text)]"
            >
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[color:var(--primary-btn)]"></div>
                        <p className="mt-2.5 text-sm text-[color:var(--nav-text)]">Loading transactions...</p>
                    </div>
                ) : !currentTransactionUser.hasOwnProperty("email") ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-sm text-[color:var(--nav-text)] text-center">
                            Select a user to view transactions
                        </p>
                    </div>
                ) : filteredTransactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-sm text-[color:var(--nav-text)] text-center">
                            No transactions found. Click the + button to add a transaction.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 pb-4">
                        {filteredTransactions.map(({ date, transactions }) => (
                            <div key={date} className="space-y-3">
                                <div className="flex justify-center sticky top-2 z-10">
                                    <span className="px-3 py-1 text-xs bg-[color:var(--notes-secondary-bg)] text-[color:var(--nav-text)] rounded-full shadow-sm">
                                        {date}
                                    </span>
                                </div>

                                <div className="space-y-2.5">
                                    {transactions.map((list) => (
                                        <Message
                                            key={list._id}
                                            time={convertToIST(list.createdAt)}
                                            isLeft={currentTransactionUser.email === list.sendBy}
                                            amount={list.amount}
                                            note={list.note}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
