import React, { createContext, useState } from 'react';

const GlobalContext = createContext();
const LoginContext = createContext();
const expenseListContext = createContext();
const DateDiffContext = createContext();
const MonthDiffContext = createContext();
const EmailContext = createContext();
const UserListContext = createContext();
const CurrentTransactionUserContext = createContext();
const TransactionListContext = createContext();
const SocketContext = createContext();

const GlobalProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  return (
    <GlobalContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </GlobalContext.Provider>
  );
};

const LoginProvider = ({children}) =>{
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
      {children}
    </LoginContext.Provider>
  )
}

const ExpenseListProvider = ({children}) =>{
  const [expenseList,setExpenseList] = useState([]);

  return (
    <expenseListContext.Provider value={{expenseList,setExpenseList}}>
      {children}
    </expenseListContext.Provider>
  )
}

const DateDiffProvider = ({children}) =>{
  const [dateDiff,setDateDiff] = useState(0);

  return (
    <DateDiffContext.Provider value={{dateDiff, setDateDiff}}>
      {children}
    </DateDiffContext.Provider>
  )
}

const MonthDiffProvider = ({children}) =>{
  const [monthDiff,setMonthDiff] = useState(0);

  return (
    <MonthDiffContext.Provider value={{monthDiff, setMonthDiff}}>
      {children}
    </MonthDiffContext.Provider>
  )
}

const EmailProvider = ({children}) => {
  const [email,setEmail] = useState("youremail@xyz.com");

  return (
    <EmailContext.Provider value={{email, setEmail}}>
      {children}
    </EmailContext.Provider>
  )
}

const UserListProvider = ({children})=>{

    const [userList,setUserList]=useState([]);

    return (
      <UserListContext.Provider value={{userList,setUserList}}>
        {children}
      </UserListContext.Provider>
    )

}

const CurrentTransactionUserProvider = ({children})=>{
  const [currentTransactionUser,setCurrentTransactionUser]=useState({});
  return (
    <CurrentTransactionUserContext.Provider value={{currentTransactionUser,setCurrentTransactionUser}}>
      {children}
    </CurrentTransactionUserContext.Provider>
  )
}

const TransactionListProvider = ({children})=>{
  const [transactionList,setTransactionList]=useState([]);
  return (
    <TransactionListContext.Provider value={{transactionList,setTransactionList}}>
      {children}
    </TransactionListContext.Provider>
  )
}

const SocketProvider = ({children})=>{
  const [socket,setSocket]=useState(null);
  return (
    <SocketContext.Provider value={{socket,setSocket}}>
      {children}
    </SocketContext.Provider>
  )
}

export {GlobalContext , LoginContext , expenseListContext,DateDiffContext, UserListContext,TransactionListContext,CurrentTransactionUserContext,SocketContext, SocketProvider,TransactionListProvider,CurrentTransactionUserProvider, UserListProvider, EmailContext,MonthDiffContext,MonthDiffProvider, EmailProvider, DateDiffProvider, ExpenseListProvider , GlobalProvider, LoginProvider}