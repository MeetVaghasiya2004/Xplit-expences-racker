const mongoose = require("mongoose");

const DateWiseSumSchema = new mongoose.Schema({
    amount:{
        type: Number
    },
    date:{
        type: Date
    }
})

const DateWiseSum = mongoose.model("DateWiseSum",DateWiseSumSchema);

module.exports = DateWiseSum;