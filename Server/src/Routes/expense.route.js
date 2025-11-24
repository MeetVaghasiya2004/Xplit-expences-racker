const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT.js")
const {
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
} = require("../controllers/expense.controller.js");

router.route("/addExpense").post(verifyJWT, addExpense);
router.route("/loadExpense").post(verifyJWT, loadExpense);
router.route("/getDailySum").post(verifyJWT, getDailySum);
router.route("/getMonthlySum").post(verifyJWT, getMonthlySum);
router.route("/getYearlySum").post(verifyJWT, getYearlySum);
router.route("/loadDailySum").post(verifyJWT, loadDailySum);
router.route("/loadMonthlySum").post(verifyJWT, loadMonthlySum);

// Analytics Routes
router.route("/getCategoryAnalytics").post(verifyJWT, getCategoryAnalytics);
router.route("/getTimeAnalytics").post(verifyJWT, getTimeAnalytics);
router.route("/getTrendAnalytics").post(verifyJWT, getTrendAnalytics);

module.exports = router