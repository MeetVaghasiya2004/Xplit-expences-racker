import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function TrendAnalytics() {
    const [trendData, setTrendData] = useState([]);
    const [comparisonType, setComparisonType] = useState("month"); // month, year
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadTrendData();
    }, [comparisonType]);

    const loadTrendData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:9507/expense/getTrendAnalytics", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ comparisonType }),
            });
            const result = await res.json();
            if (result.statuscode === 200) {
                setTrendData(result.data);
            }
        } catch (error) {
            console.error("Error loading trend analytics:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getComparisonLabel = () => {
        switch (comparisonType) {
            case "month":
                return "Monthly Comparison (Last 6 Months)";
            case "year":
                return "Yearly Comparison (Last 3 Years)";
            default:
                return "Expense Trends";
        }
    };

    return (
        <div className="space-y-6">
            {/* Comparison Type Selector */}
            <div className="flex justify-end">
                <select
                    value={comparisonType}
                    onChange={(e) => setComparisonType(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-[color:var(--notes-hover-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)]"
                >
                    <option value="month">Last 6 Months</option>
                    <option value="year">Last 3 Years</option>
                </select>
            </div>

            {/* Bar Chart */}
            <div className="bg-[color:var(--notes-hover-bg)] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[color:var(--text-color)] mb-4">{getComparisonLabel()}</h3>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="period" 
                                tickFormatter={(value) => {
                                    if (comparisonType === "month") {
                                        return new Date(value).toLocaleDateString('en-US', { month: 'short' });
                                    } else {
                                        return value;
                                    }
                                }}
                            />
                            <YAxis />
                            <Tooltip 
                                labelFormatter={(value) => {
                                    if (comparisonType === "month") {
                                        return new Date(value).toLocaleDateString('en-US', { 
                                            year: 'numeric',
                                            month: 'long'
                                        });
                                    } else {
                                        return value;
                                    }
                                }}
                            />
                            <Legend />
                            <Bar dataKey="current" name="Current Period" fill="#8884d8" />
                            <Bar dataKey="previous" name="Previous Period" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[color:var(--notes-hover-bg)] rounded-lg p-4">
                    <h4 className="text-sm text-[color:var(--nav-text)]">Average Expense</h4>
                    <p className="text-2xl font-semibold text-[color:var(--text-color)]">
                        ₹{trendData.reduce((acc, curr) => acc + curr.current, 0) / trendData.length}
                    </p>
                </div>
                <div className="bg-[color:var(--notes-hover-bg)] rounded-lg p-4">
                    <h4 className="text-sm text-[color:var(--nav-text)]">Total Expenses</h4>
                    <p className="text-2xl font-semibold text-[color:var(--text-color)]">
                        ₹{trendData.reduce((acc, curr) => acc + curr.current, 0)}
                    </p>
                </div>
                <div className="bg-[color:var(--notes-hover-bg)] rounded-lg p-4">
                    <h4 className="text-sm text-[color:var(--nav-text)]">Growth Rate</h4>
                    <p className="text-2xl font-semibold text-[color:var(--text-color)]">
                        {(() => {
                            const firstAmount = trendData[0]?.current || 0;
                            const lastAmount = trendData[trendData.length - 1]?.current || 0;
                            if (firstAmount === 0) return "0%";
                            return `${((lastAmount - firstAmount) / firstAmount * 100).toFixed(1)}%`;
                        })()}
                    </p>
                </div>
            </div>
        </div>
    );
} 