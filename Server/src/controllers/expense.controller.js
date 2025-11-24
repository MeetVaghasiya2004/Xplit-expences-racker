const ApiError = require("../utils/ApiError")
const User = require("../models/user.model.js")
const ExpenseList = require("../models/ExpenseList.model.js")
const ApiResponse = require("../utils/ApiResponse")
const DateWiseSum = require("../models/DateWiseSum.model.js")
const MonthWiseSum = require("../models/MonthWiseSum.model.js")

const addExpense = async (req,res) => {

    try {
        const user = req.user

        if(!user){
            res.status(401).json(new ApiResponse(401,{},"You are not logged in to add expense"));
        }

        const {amount, note, category,createDate} = req.body

        const expense = await ExpenseList.create({
            amount,
            note,
            category,
            createDate
        })
        const userDB = await User.findById(user._id);
        userDB.expenseLists.push(expense);

        const findDate= new Date(createDate);

        let dailyNotFound = true;

        if(userDB.dateWiseSums){
            await Promise.all(userDB.dateWiseSums.map(async (dateWiseSumId) => {
                const dateSum = await DateWiseSum.findById(dateWiseSumId);
                const createDate = new Date(dateSum.date);
                // return exp;

                if (createDate.getFullYear() === findDate.getFullYear() &&
                    createDate.getMonth() === findDate.getMonth() &&
                    createDate.getDate() === findDate.getDate()) {
                    dailyNotFound=false;
                    dateSum.amount += parseInt(amount);
                    await dateSum.save();
                }
            }));
        }
        if(dailyNotFound){
            const dateWiseSum =await DateWiseSum.create({
                amount,
                date:createDate
            })
            userDB.dateWiseSums.push(dateWiseSum)
        }
        
        let monthlyNotFound = true;

        if(userDB.monthWiseSums){
            await Promise.all(userDB.monthWiseSums.map(async (monthWiseSumId) => {
                const monthSum = await MonthWiseSum.findById(monthWiseSumId);
                const createDate = new Date(monthSum.date);

                if (createDate.getFullYear() === findDate.getFullYear() &&
                    createDate.getMonth() === findDate.getMonth()) {
                    monthlyNotFound=false;
                    monthSum.amount += parseInt(amount);
                    await monthSum.save();
                }
            }));
        }
        if(monthlyNotFound){
            const monthWiseSum =await MonthWiseSum.create({
                amount,
                date:createDate
            })
            userDB.monthWiseSums.push(monthWiseSum)
        }
        
        await userDB.save({validateBeforeSave:false});
        res.status(200).json(new ApiResponse(200,expense,"expense added"))
    }
    catch(err){
        throw new ApiError(500,"Failed to add expense");
    }
}

const loadExpense = async (req,res) => {
    try {
        const user = req.user;
        if(!user) {
            res.status(401).json(new ApiResponse(401,{},"You are not logged in to add expense"));
        }
        const data = await User.findById(user._id);
        let response = [];
        const dateToFind = new Date(req.body.date);
        console.log("Backend - Loading expenses for date:", dateToFind.toLocaleString('default', { month: 'long', year: 'numeric' }));
        
        if (data.expenseLists) {
            response = await Promise.all(data.expenseLists.map(async (expenseId) => {
                const exp = await ExpenseList.findById(expenseId);
                if (!exp) return null;
                
                const createDate = new Date(exp.createDate);
                const expMonth = createDate.getMonth();
                const expYear = createDate.getFullYear();
                const targetMonth = dateToFind.getMonth();
                const targetYear = dateToFind.getFullYear();

                const isMatch = expMonth === targetMonth && expYear === targetYear;
                console.log(`Backend - Expense date: ${createDate.toLocaleString()}, Target date: ${dateToFind.toLocaleString()}, Is match: ${isMatch}`);
                
                if (isMatch) {
                    return exp;
                }
                return null;
            }));
        }

        response = response.filter(exp => exp !== null);
        console.log(`Backend - Found ${response.length} matching expenses`);
        res.status(200).json(new ApiResponse(200,response,"Expense loaded successfully"));
    }
    catch(err) {
        console.error("Backend - Error loading expenses:", err);
        throw new ApiError(500,"failed to load expense");
    }
}

const getDailySum = async (req,res)=>{

    try{
        const userDB =await User.findById(req.user._id)
        const date=req.body.date;

        const findDate=new Date(date);
        let amount=0;
        if(userDB.dateWiseSums){
            await Promise.all(userDB.dateWiseSums.map(async (dateWiseSumId) => {
                const dateSum = await DateWiseSum.findById(dateWiseSumId);
                const createDate = new Date(dateSum.date);

                if (createDate.getFullYear() === findDate.getFullYear() &&
                    createDate.getMonth() === findDate.getMonth() &&
                    createDate.getDate() === findDate.getDate()) {
                    amount=dateSum.amount;
                }
            }));
        }
        res.status(200).json(new ApiResponse(200,{amount},"Daily sum fetched"));
    }
    catch(err){
        console.log("Error while fetching daily sum",err);
    }   
}

const getMonthlySum =async (req,res)=>{
    try{
        const userDB =await User.findById(req.user._id)
        const date=req.body.date;
        const findDate=new Date(date);
        let amount=0;
        if(userDB.monthWiseSums){
            await Promise.all(userDB.monthWiseSums.map(async (monthWiseSumId) => {
                const monthSum = await MonthWiseSum.findById(monthWiseSumId);
                const createDate = new Date(monthSum.date);

                if (createDate.getFullYear() === findDate.getFullYear() &&
                    createDate.getMonth() === findDate.getMonth()) {
                    amount=monthSum.amount;
                }
            }));
        }
        res.status(200).json(new ApiResponse(200,{amount},"Monthly sum fetched"));
    }
    catch(err){
        console.log("Error while fetching monthly sum",err);
    }
}

const getYearlySum =async (req,res)=>{
    try{
        const userDB =await User.findById(req.user._id)
        const findDate=new Date();
        let amount=0;
        if(userDB.monthWiseSums){
            await Promise.all(userDB.monthWiseSums.map(async (monthWiseSumId) => {
                const monthSum = await MonthWiseSum.findById(monthWiseSumId);
                const createDate = new Date(monthSum.date);

                if (createDate.getFullYear() === findDate.getFullYear()) {
                    amount+=monthSum.amount;
                }
            }));
        }
        res.status(200).json(new ApiResponse(200,{amount},"Monthly sum fetched")); 
    }
    catch(err){
        console.log("Error while fetching yearly sum",err);
    }
}
const loadDailySum = async (req,res)=>{
    try{
        const userDB = await User.findById(req.user._id)
        let findDate =new Date(req.body.date);
        const month=findDate.getMonth();

        let dailySum=[];

        while(findDate.getMonth() === month){
            const date=new Date(findDate);
            dailySum.push({
                date,
                amount:0
            })
            findDate.setDate(findDate.getDate()+1);
        }

        findDate.setMonth(findDate.getMonth()-1);

        if(userDB.dateWiseSums){
            await Promise.all(userDB.dateWiseSums.map(async (dateWiseSumId) => {
                const dateSum = await DateWiseSum.findById(dateWiseSumId);
                const createDate = new Date(dateSum.date);

                if (createDate.getFullYear() === findDate.getFullYear() &&
                    createDate.getMonth() === findDate.getMonth()) {

                    dailySum[createDate.getDate() - 1].amount+=dateSum.amount;
                }
            }));
        }
        res.status(200).json(dailySum);
    }
    catch(err){
        console.log("Error while loading daily sum",err);
    }
}

const loadMonthlySum = async (req,res)=>{
    try{
        const userDB = await User.findById(req.user._id)
        let findDate =new Date(req.body.date);
        const year=findDate.getYear();

        let dateTofind=new Date(findDate);

        let monthlySum=[];

        while(findDate.getYear() === year){
            const date=new Date(findDate);
            monthlySum.push({
                date,
                amount:0
            })
            findDate.setMonth(findDate.getMonth()+1);
        }

        findDate=dateTofind;

        if(userDB.monthWiseSums){
            await Promise.all(userDB.monthWiseSums.map(async (monthWiseSumId) => {
                const monthSum = await MonthWiseSum.findById(monthWiseSumId);
                const createDate = new Date(monthSum.date);

                if (createDate.getFullYear() === findDate.getFullYear()) {
                    monthlySum[createDate.getMonth()].amount+=monthSum.amount;
                }
            }));
        }

        res.status(200).json(monthlySum);
    }
    catch(err){
        console.log("Error while loading daily sum",err);
    }
}

const getCategoryAnalytics = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json(new ApiResponse(401, {}, "You are not logged in"));
        }

        const { timeframe } = req.body;
        const userDB = await User.findById(user._id);
        const now = new Date();
        let startDate;

        // Calculate start date based on timeframe
        if (timeframe === "month") {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        } else {
            startDate = new Date(now.getFullYear(), 0, 1);
        }

        // Initialize category totals
        const categoryTotals = {
            health: 0,
            food: 0,
            travel: 0,
            shop: 0,
            rent: 0,
            other: 0
        };

        // Calculate totals for each category
        if (userDB.expenseLists) {
            await Promise.all(userDB.expenseLists.map(async (expenseId) => {
                const exp = await ExpenseList.findById(expenseId);
                if (!exp) return;

                const createDate = new Date(exp.createDate);
                if (createDate >= startDate) {
                    categoryTotals[exp.category] += parseInt(exp.amount);
                }
            }));
        }

        // Convert to array format for charts
        const data = Object.entries(categoryTotals).map(([category, amount]) => ({
            category,
            amount
        }));

        res.status(200).json(new ApiResponse(200, data, "Category analytics fetched successfully"));
    } catch (err) {
        console.error("Error in getCategoryAnalytics:", err);
        throw new ApiError(500, "Failed to fetch category analytics");
    }
};

const getTimeAnalytics = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json(new ApiResponse(401, {}, "You are not logged in"));
        }

        const { timeframe } = req.body;
        const userDB = await User.findById(user._id);
        const now = new Date();
        let data = [];

        if (timeframe === "week") {
            // Get last 7 days
            for (let i = 6; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(date.getDate() - i);
                data.push({
                    date: date.toISOString(),
                    amount: 0
                });
            }
        } else if (timeframe === "month") {
            // Get all days in current month
            const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(now.getFullYear(), now.getMonth(), i);
                data.push({
                    date: date.toISOString(),
                    amount: 0
                });
            }
        } else {
            // Get all months in current year
            for (let i = 0; i < 12; i++) {
                const date = new Date(now.getFullYear(), i, 1);
                data.push({
                    date: date.toISOString(),
                    amount: 0
                });
            }
        }

        // Calculate amounts for each period
        if (userDB.expenseLists) {
            await Promise.all(userDB.expenseLists.map(async (expenseId) => {
                const exp = await ExpenseList.findById(expenseId);
                if (!exp) return;

                const createDate = new Date(exp.createDate);
                const expDate = new Date(createDate);
                
                if (timeframe === "week") {
                    const dayIndex = data.findIndex(d => 
                        new Date(d.date).toDateString() === expDate.toDateString()
                    );
                    if (dayIndex !== -1) {
                        data[dayIndex].amount += parseInt(exp.amount);
                    }
                } else if (timeframe === "month") {
                    const dayIndex = data.findIndex(d => 
                        new Date(d.date).getDate() === expDate.getDate()
                    );
                    if (dayIndex !== -1) {
                        data[dayIndex].amount += parseInt(exp.amount);
                    }
                } else {
                    const monthIndex = data.findIndex(d => 
                        new Date(d.date).getMonth() === expDate.getMonth()
                    );
                    if (monthIndex !== -1) {
                        data[monthIndex].amount += parseInt(exp.amount);
                    }
                }
            }));
        }

        res.status(200).json(new ApiResponse(200, data, "Time analytics fetched successfully"));
    } catch (err) {
        console.error("Error in getTimeAnalytics:", err);
        throw new ApiError(500, "Failed to fetch time analytics");
    }
};

const getTrendAnalytics = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json(new ApiResponse(401, {}, "You are not logged in"));
        }

        const { comparisonType } = req.body;
        const userDB = await User.findById(user._id);
        const now = new Date();
        let data = [];

        if (comparisonType === "month") {
            // Get last 6 months
            for (let i = 5; i >= 0; i--) {
                const date = new Date(now);
                date.setMonth(date.getMonth() - i);
                data.push({
                    period: date.toISOString(),
                    current: 0,
                    previous: 0
                });
            }
        } else {
            // Get last 3 years
            for (let i = 2; i >= 0; i--) {
                const date = new Date(now);
                date.setFullYear(date.getFullYear() - i);
                data.push({
                    period: date.getFullYear().toString(),
                    current: 0,
                    previous: 0
                });
            }
        }

        // Calculate amounts for each period
        if (userDB.expenseLists) {
            await Promise.all(userDB.expenseLists.map(async (expenseId) => {
                const exp = await ExpenseList.findById(expenseId);
                if (!exp) return;

                const createDate = new Date(exp.createDate);
                
                if (comparisonType === "month") {
                    const monthIndex = data.findIndex(d => 
                        new Date(d.period).getMonth() === createDate.getMonth() &&
                        new Date(d.period).getFullYear() === createDate.getFullYear()
                    );
                    if (monthIndex !== -1) {
                        data[monthIndex].current += parseInt(exp.amount);
                    }

                    // Calculate previous period
                    const prevMonthIndex = data.findIndex(d => 
                        new Date(d.period).getMonth() === createDate.getMonth() &&
                        new Date(d.period).getFullYear() === createDate.getFullYear() - 1
                    );
                    if (prevMonthIndex !== -1) {
                        data[prevMonthIndex].previous += parseInt(exp.amount);
                    }
                } else {
                    const yearIndex = data.findIndex(d => 
                        d.period === createDate.getFullYear().toString()
                    );
                    if (yearIndex !== -1) {
                        data[yearIndex].current += parseInt(exp.amount);
                    }

                    // Calculate previous period
                    const prevYearIndex = data.findIndex(d => 
                        d.period === (createDate.getFullYear() - 1).toString()
                    );
                    if (prevYearIndex !== -1) {
                        data[prevYearIndex].previous += parseInt(exp.amount);
                    }
                }
            }));
        }

        res.status(200).json(new ApiResponse(200, data, "Trend analytics fetched successfully"));
    } catch (err) {
        console.error("Error in getTrendAnalytics:", err);
        throw new ApiError(500, "Failed to fetch trend analytics");
    }
};

module.exports ={
    addExpense,
    loadExpense,
    getDailySum,
    getMonthlySum,
    getYearlySum,
    loadDailySum,
    loadMonthlySum,
    getCategoryAnalytics,
    getTimeAnalytics,
    getTrendAnalytics
}