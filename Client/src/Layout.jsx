import {Outlet} from "react-router-dom"; 
import Navigator from "./components/Navigator.jsx";
import Header from "./components/Header.jsx"

export default function Layout(){
    return (
        <>
            <Header />
            <Outlet />
            <Navigator />
        </>
    )
}