// import { useContext } from "react"
// import { DateDiffContext } from "../../globalAttributes"

// export default function ExpenseHeading(props){

//     const {dateDiff, setDateDiff} = useContext(DateDiffContext);

//     function decrementDiff(){
//         setDateDiff(dateDiff - 1);
//     }
//     function incrementDiff(){
//         setDateDiff(dateDiff + 1);
//     }

//     return (
//             <div className="flex items-center justify-around w-[100%] h-[10%] bg-[color:var(--header)] rounded-t-lg">
//                 <button onClick={decrementDiff} className="bg-[color:var(--primary-btn)] drop-shadow-lg rounded-3xl p-2"><img src="/images/Move-left.svg" alt="previous" /></button>
//                     <h2 className="text-[140%] font-semibold">{props.text}</h2>
//                 <button onClick={incrementDiff} className="bg-[color:var(--primary-btn)] drop-shadow-lg rounded-3xl p-2"><img src="/images/Move-right.svg" alt="next" /></button>
//             </div>
//     )
// }


import { useContext } from "react"
import { DateDiffContext } from "../../globalAttributes"

export default function ExpenseHeading({ text }) {
    const { dateDiff, setDateDiff } = useContext(DateDiffContext);

    const handleDecrement = () => setDateDiff(dateDiff - 1);
    const handleIncrement = () => setDateDiff(dateDiff + 1);

    return (
        <div className="flex items-center justify-between p-4 sm:p-6 bg-[color:var(--header)] border-b border-[color:var(--border)] rounded-t-lg">
            <button 
                onClick={handleDecrement}
                className="btn-icon"
                aria-label="Previous"
            >
                <img 
                    src="/images/Move-left.svg" 
                    alt="Previous" 
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" 
                />
            </button>
            
            <h2 className="text-lg sm:text-xl font-semibold text-[color:var(--text-color)] animate-fade-in">
                {text}
            </h2>
            
            <button 
                onClick={handleIncrement}
                className="btn-icon"
                aria-label="Next"
            >
                <img 
                    src="/images/Move-right.svg" 
                    alt="Next" 
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" 
                />
            </button>
        </div>
    )
}
