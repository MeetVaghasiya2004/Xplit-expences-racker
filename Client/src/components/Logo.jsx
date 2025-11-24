import {GlobalContext} from '../../globalAttributes.jsx';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

export default function Logo(){
    const { isDark } = useContext(GlobalContext);

    return (
        <NavLink to="/" className="flex items-center group">
            <img 
                className="h-[6vh] sm:h-[8vh] transition-transform duration-300 group-hover:scale-105" 
                src={`${isDark ? "../../images/Logo-white.png" :"../../images/Logo-black.png"}`} 
                alt="Xplit"
            />
            <span className="text-2xl sm:text-3xl font-bold ml-2 text-gradient">plit</span>
        </NavLink>
    )
}