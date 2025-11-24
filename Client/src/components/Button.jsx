import {GlobalContext} from '../../globalAttributes.jsx';
import { useContext } from 'react';

export default function Button({ text, className = '', ...props }){
    const { isDark } = useContext(GlobalContext);

    return(
        <button 
            className={`btn ${className}`}
            {...props}
        >
            {text}
        </button>
    )
}