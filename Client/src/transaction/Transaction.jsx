import React, { useContext, useMemo, useEffect } from "react";
import Left from "./LeftSide/Left";
import Right from "./RightSide/Right";
import AmountDetails from "./RightSide/AmountDetails";
import AddTransaction from "./RightSide/AddTransaction";
import { UserListProvider, CurrentTransactionUserContext, TransactionListProvider, SocketContext } from "../../globalAttributes.jsx";
import { io } from "socket.io-client";

export default function Transaction() {
    const { currentTransactionUser } = useContext(CurrentTransactionUserContext);
    const { socket, setSocket } = useContext(SocketContext);
    const socketIO = useMemo(() => io("http://localhost:9507"), []);
    
    useEffect(() => {
        socketIO.on("connect", () => {
            console.log("connected", socketIO.id);
            (async () => {
                await fetch("http://localhost:9507/transaction/addOnlineUser", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ socketId: socketIO.id })
                })
            })()
            setSocket(socketIO);
        })

        return () => {
            socketIO.disconnect();
        };
    }, []);

    return (
        <TransactionListProvider>
            <UserListProvider>
                <div className="min-h-[calc(100vh-4rem)] pt-20 pb-6 px-4">
                    <div className="h-full flex gap-4">
                        <div className="w-[280px] shrink-0">
                            <Left />
                        </div>
                        <div className="flex-1">
                            <Right />
                        </div>
                        <div className="w-[240px] shrink-0 space-y-4">
                            <AmountDetails />
                            <AddTransaction />
                        </div>
                    </div>
                </div>
            </UserListProvider>
        </TransactionListProvider>
    );
}