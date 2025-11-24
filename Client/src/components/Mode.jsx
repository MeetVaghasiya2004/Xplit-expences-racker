import { useContext } from "react";
import {GlobalContext} from '../../globalAttributes.jsx';

export default function Mode(){
    const { isDark, setIsDark } = useContext(GlobalContext);

    const toggleTheme = () => {
        setIsDark(!isDark);
        window.localStorage.setItem("isDark", !isDark);
    };

    return(
        <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-primary/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Toggle theme"
        >
            <img 
                className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 hover:rotate-12" 
                src={`${isDark ? "../../images/Light-mode.svg" : "../../images/Dark-mode.svg"}`} 
                alt="Change mode" 
            />
        </button>
    )
}