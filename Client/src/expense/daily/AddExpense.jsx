// import InputField from "../../login/InputField.jsx"
// import Button from "../../components/Button.jsx"
// import { DateDiffContext, expenseListContext } from "../../../globalAttributes.jsx";
// import { useContext } from "react";

// export default function AddExpense(){

//     const {expenseList,setExpenseList} = useContext(expenseListContext);
//     const {dateDiff} = useContext(DateDiffContext)

//     const HandleAddExpense = async function(e){
//         e.preventDefault();
//         let amount = e.target.amount.value;
//         let note = e.target.note.value ? e.target.note.value : "";
//         let category = e.target.category.value;

//         const reqData ={
//             amount,
//             note,
//             category,
//             createDate:new Date().setDate(new Date().getDate()+dateDiff)
//         }

//         const res = await fetch("http://localhost:9507/expense/addExpense",{
//             method:"POST",
//             credentials:'include',
//             headers:{
//                 'Content-Type': 'application/json'
//             },
//             body:JSON.stringify(reqData)
//         })
//         if(res.ok){
//             const responseData = await res.json();
//             setExpenseList(expenseList => [responseData.data , ...expenseList]);
//         }
//         else{
//             console.log("failed to add data");
//         }
//     }

//     return (
//         <div className="drop-shadow-lg rounded-t-md flex flex-col items-center h-[320px] self-end ml-2 align-bottom w-[300px] bg-[color:var(--nav-bg)] rounded-md">
//             <div className="w-[100%] h-[20%] bg-[color:var(--header)] rounded-t-md flex items-center justify-center font-semibold text-xl">Add Expense</div>
//             <form onSubmit={HandleAddExpense} className="h-[80%] flex flex-col items-center gap-2">
//                 <InputField id="amount" name="amount" placeHolder="Enter Amount" type="number" isLimit="true"/>
//                 <InputField id="Note" name="note" placeHolder="Enter Your Note" type="text"/>
//                 <select name="category" id="category" className="bg-[color:var(--header)] text-center w-[80%] py-1 rounded-md">
//                     <option value="other" selected>Other</option>
//                     <option value="food">Food</option>
//                     <option value="travel">Travel</option>
//                     <option value="health">Health</option>
//                     <option value="shop">Shop</option>
//                     <option value="rent">Rent</option>
//                 </select>
//                 <button className="bg-[color:var(--primary-btn)] p-3 rounded-md hover:scale-[1.05] transition-all ease-out">Add</button>
//             </form>
//         </div>
//     )
// }


import InputField from "../../login/InputField.jsx";
import { DateDiffContext, expenseListContext } from "../../../globalAttributes.jsx";
import { useContext } from "react";

export default function AddExpense({ onClose }) {
    const { expenseList, setExpenseList } = useContext(expenseListContext);
    const { dateDiff } = useContext(DateDiffContext);

    const HandleAddExpense = async (e) => {
        e.preventDefault();
        let amount = e.target.amount.value;
        let note = e.target.note.value || "";
        let category = e.target.category.value;

        const reqData = {
            amount,
            note,
            category,
            createDate: new Date().setDate(new Date().getDate() + dateDiff),
        };

        try {
            const res = await fetch("http://localhost:9507/expense/addExpense", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqData),
            });

            if (res.ok) {
                const responseData = await res.json();
                setExpenseList((expenseList) => [responseData.data, ...expenseList]);
                onClose?.(); // Close modal on success
                e.target.reset(); // Reset form
            } else {
                console.error("Failed to add expense");
            }
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    return (
        <div className="bg-[color:var(--nav-bg)] shadow-xl rounded-2xl p-8 w-full">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-color mb-6 text-center">Add Expense</h2>

            {/* Form */}
            <form onSubmit={HandleAddExpense} className="flex flex-col gap-4">
                {/* Amount Input */}
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-[color:var(--nav-text)] mb-1">Amount</label>
                    <InputField
                        id="amount"
                        name="amount"
                        placeHolder="Enter amount"
                        type="number"
                        isLimit="true"
                        required
                        className="w-full bg-[color:var(--header)] border border-[color:var(--border-color)] rounded-md py-2 px-3"
                    />
                </div>

                {/* Note Input */}
                <div>
                    <label htmlFor="note" className="block text-sm font-medium text-[color:var(--nav-text)] mb-1">Note (optional)</label>
                    <InputField
                        id="note"
                        name="note"
                        placeHolder="Enter note"
                        type="text"
                        className="w-full bg-[color:var(--header)] border border-[color:var(--border-color)] rounded-md py-2 px-3"
                    />
                </div>

                {/* Category Select */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-[color:var(--nav-text)] mb-1">Category</label>
                    <div className="relative">
                        <select
                            id="category"
                            name="category"
                            className="w-full bg-[color:var(--header)] border border-[color:var(--border-color)] rounded-md py-2 px-3 appearance-none text-[color:var(--text-color)]"
                            required
                        >
                            <option value="other">Other</option>
                            <option value="food">Food</option>
                            <option value="travel">Travel</option>
                            <option value="health">Health</option>
                            <option value="shop">Shop</option>
                            <option value="rent">Rent</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[color:var(--nav-text)]">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[color:var(--primary-btn)] hover:bg-[color:var(--primary-btn-hover)] text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
}
