import React, { useContext, useState ,useEffect} from "react";
import reactDOM from "react-dom"
import "./index.css"
import Header from "./components/Header.jsx"
import Navigator from "./components/Navigator.jsx"
import { GlobalProvider,GlobalContext,LoginContext,LoginProvider, ExpenseListProvider ,EmailProvider,CurrentTransactionUserProvider,SocketProvider} from "../globalAttributes.jsx";
import Login from "./login/Login.jsx"
import SignUp from "./signup/SignUp.jsx"
import { BrowserRouter, Routes,Route} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Layout from "./Layout.jsx";
import Expense from "./expense/Expense.jsx"
import Transaction from "./transaction/Transaction.jsx"
import Setting from "./setting/Setting.jsx"
import Welcome from "./welcome/Welcome.jsx";
import Daily from "./expense/daily/Daily.jsx"
import Monthly from "./expense/monthly/Monthly.jsx"
import Yearly from "./expense/yearly/Yearly.jsx"
import Analytics from "./expense/analytics/Analytics.jsx"
import NotFound from "./NotFound.jsx";
import NotSignIn from "./NotSignIn.jsx";
import Logout from "./setting/Logout/Logout.jsx";
import PasswordChange from "./setting/passwordChange/PasswordChange.jsx";
import EmailChange from "./setting/emailChange/EmailChange.jsx";
import SelectExpense from "../src/expense/SelectExpense.jsx"

const Main = () => {

    const { isLoggedIn,setIsLoggedIn } = useContext(LoginContext);
    const {isDark,setIsDark}=useContext(GlobalContext);
    const navigate = useNavigate();

    const isDarkLocal = window.localStorage.getItem("isDark");
    if(isDarkLocal !== null){
      setIsDark(JSON.parse(isDarkLocal));
    }

  useEffect(() =>  {
    (async function fetchData(){
        const res = await fetch("http://localhost:9507/user/getUser", {
          method: "POST",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      
        if(res.ok){
          setIsLoggedIn(true);
          navigate('/expense');
        }
  })()
  }, []);

    document.body.setAttribute("data-theme",isDark ? "Dark" : "Light");
    // window.localStorage.removeItem("isDark");
    // window.localStorage.removeItem("email");

    return (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Welcome />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="expense" element={isLoggedIn ? <Expense /> : <NotSignIn/>}>
                <Route path="" element={<SelectExpense />} />
                <Route path="daily" element={<Daily />} />
                <Route path="monthly" element={<Monthly />} />
                <Route path="yearly" element={<Yearly />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>
              <Route path="transaction" element={isLoggedIn ? <Transaction /> : <NotSignIn/>} />
              <Route path="setting" element={isLoggedIn ? <Setting /> : <NotSignIn/>} >
                <Route path="" element={<PasswordChange />} />
                <Route path="change-password" element={<PasswordChange />} />
                <Route path="change-email" element={<EmailChange />} />
                <Route path="logout" element={<Logout />} />
              </Route>
              <Route path=":any" element={<NotFound />} />
            </Route>
          </Routes>
    );
};

const root = document.getElementById('root');
reactDOM.createRoot(root).render( 
<GlobalProvider>
    <LoginProvider>
      <ExpenseListProvider>
        <CurrentTransactionUserProvider>
          <SocketProvider>
          <EmailProvider>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
          </EmailProvider>
          </SocketProvider>
        </CurrentTransactionUserProvider>
      </ExpenseListProvider>
    </LoginProvider>
</GlobalProvider>
);