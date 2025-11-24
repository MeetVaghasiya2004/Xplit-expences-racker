const mongoose = require("mongoose");

const ExpenseListSchema = new mongoose.Schema({
    amount:{
        type: Number,
        required: true
    },
    note: {
        type: String
    },
    category: {
        type: String
    },
    createDate :{
        type: Date
    }
},{timestamps : true});

const ExpenseList = mongoose.model("ExpenseList",ExpenseListSchema);
module.exports = ExpenseList;