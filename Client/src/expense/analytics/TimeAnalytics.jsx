import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function TimeAnalytics() {
    const [timeData, setTimeData] = useState([]);
    const [timeframe, setTimeframe] = useState("week"); // week, month, year
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadTimeData();
    }, [timeframe]);

    const loadTimeData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:9507/expense/getTimeAnalytics", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ timeframe }),
            });
            const result = await res.json();
            if (result.statuscode === 200) {
                setTimeData(result.data);
            }
        } catch (error) {
            console.error("Error loading time analytics:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getTimeframeLabel = () => {
        switch (timeframe) {
            case "week":
                return "Daily Expenses (Last 7 Days)";
            case "month":
                return "Daily Expenses (This Month)";
            case "year":
                return "Monthly Expenses (This Year)";
            default:
                return "Expenses Over Time";
        }
    };

    return (
        <div className="space-y-6">
            {/* Timeframe Selector */}
            <div className="flex justify-end">
                <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-[color:var(--notes-hover-bg)] text-[color:var(--text-color)] border border-[color:var(--border-color)]"
                >
                    <option value="week">Last 7 Days</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                </select>
            </div>

            {/* Line Chart */}
            <div className="bg-[color:var(--notes-hover-bg)] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[color:var(--text-color)] mb-4">{getTimeframeLabel()}</h3>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="date" 
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    switch (timeframe) {
                                        case "week":
                                            return date.toLocaleDateString('en-US', { weekday: 'short' });
                                        case "month":
                                            return date.toLocaleDateString('en-US', { day: 'numeric' });
                                        case "year":
                                            return date.toLocaleDateString('en-US', { month: 'short' });
                                        default:
                                            return value;
                                    }
                                }}
                            />
                            <YAxis />
                            <Tooltip 
                                labelFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString('en-US', { 
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    });
                                }}
                            />
                            <Legend />
                            <Line 
                                type="monotone" 
                                dataKey="amount" 
                                stroke="#8884d8" 
                                strokeWidth={2}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
} 