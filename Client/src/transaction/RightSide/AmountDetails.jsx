import React from "react";
import { useEffect, useContext, useState } from "react";
import { CurrentTransactionUserContext, TransactionListContext } from "../../../globalAttributes";

export default function AmountDetails() {
    const [total, setTotal] = useState(0);
    const [email, setEmail] = useState();
    const [chatEmail, setChatEmail] = useState();
    const { currentTransactionUser } = useContext(CurrentTransactionUserContext);
    const { transactionList } = useContext(TransactionListContext);
    const currentUserEmail = localStorage.getItem("email");

    useEffect(() => {
        async function loadSum() {
            const recieverEmail = currentTransactionUser.email;
            const data = { recieverEmail };

            const res = await fetch("http://localhost:9507/transaction/getSum", {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await res.json();
            setTotal(responseData.data.total);
            setEmail(responseData.data.firstPerson);
            setChatEmail(responseData.data.firstPers);
        }
        loadSum();
    }, [transactionList, currentTransactionUser.email]);

    function checkGive() {
        if ((total < 0) && (email === chatEmail)) {
            return true;
        } else if ((total > 0) && (email !== chatEmail)) {
            return true;
        }
        return false;
    }

    const isGiving = checkGive();

    return (
        <div className="bg-[color:var(--notes-bg)] rounded-lg shadow-xl overflow-hidden">
            <div className="p-3 text-center">
                <div className="mb-3">
                    <span className="text-lg text-[color:var(--nav-text)]">
                        You will {isGiving ? 'give' : 'get'}
                    </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-semibold text-[color:var(--text-color)]">
                        ₹{Math.abs(total).toLocaleString()}
                    </span>
                </div>
                <div className="mt-2">
                    <span className="text-sm text-[color:var(--nav-text)]">
                        {isGiving ? 'Amount you owe' : 'Amount owed to you'}
                    </span>
                </div>
            </div>
        </div>
    );
}