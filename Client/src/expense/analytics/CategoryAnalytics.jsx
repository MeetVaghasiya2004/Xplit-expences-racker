import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

export default function CategoryAnalytics() {
    const [categoryData, setCategoryData] = useState([]);
    const [timeframe, setTimeframe] = useState("month"); // month, year
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadCategoryData();
    }, [timeframe]);

    const loadCategoryData = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:9507/expense/getCategoryAnalytics", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ timeframe }),
            });
            const result = await res.json();
            if (result.statuscode === 200) {
                setCategoryData(result.data);
            }
        } catch (error) {
            console.error("Error loading category analytics:", error);
        } finally {
            setIsLoading(false);
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
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                </select>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="bg-[color:var(--notes-hover-bg)] rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-[color:var(--text-color)] mb-4">Category Distribution</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    dataKey="amount"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-[color:var(--notes-hover-bg)] rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-[color:var(--text-color)] mb-4">Category Comparison</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="amount" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
} 