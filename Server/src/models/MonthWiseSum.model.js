const mongoose = require("mongoose");

const MonthWiseSumSchema = new mongoose.Schema({
    amount:{
        type: Number
    },
    date:{
        type: Date
    }
})

const MonthWiseSum = mongoose.model("MonthWiseSum",MonthWiseSumSchema);

module.exports = MonthWiseSum;