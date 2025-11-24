import { useState, useEffect, useContext } from "react";
import { expenseListContext } from "../../../globalAttributes.jsx";
import CategoryAnalytics from "./CategoryAnalytics";
import TimeAnalytics from "./TimeAnalytics";
import TrendAnalytics from "./TrendAnalytics";

export default function Analytics() {
    const [activeTab, setActiveTab] = useState("category");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="h-full flex flex-col">
            {/* Tabs */}
            <div className="bg-[color:var(--notes-bg)] rounded-lg shadow-md mb-6">
                <div className="flex space-x-4 p-4">
                    <button
                        onClick={() => setActiveTab("category")}
                        className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                            activeTab === "category"
                                ? "bg-[color:var(--primary-btn)] text-white"
                                : "text-[color:var(--nav-text)] hover:bg-[color:var(--notes-hover-bg)]"
                        }`}
                    >
                        Category Analysis
                    </button>
                    <button
                        onClick={() => setActiveTab("time")}
                        className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                            activeTab === "time"
                                ? "bg-[color:var(--primary-btn)] text-white"
                                : "text-[color:var(--nav-text)] hover:bg-[color:var(--notes-hover-bg)]"
                        }`}
                    >
                        Time Analysis
                    </button>
                    <button
                        onClick={() => setActiveTab("trend")}
                        className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                            activeTab === "trend"
                                ? "bg-[color:var(--primary-btn)] text-white"
                                : "text-[color:var(--nav-text)] hover:bg-[color:var(--notes-hover-bg)]"
                        }`}
                    >
                        Trend Analysis
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-[color:var(--notes-bg)] rounded-lg shadow-md p-6">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--primary-btn)]"></div>
                        <div className="text-[color:var(--nav-text)] mt-4">
                            Loading analytics...
                        </div>
                    </div>
                ) : (
                    <>
                        {activeTab === "category" && <CategoryAnalytics />}
                        {activeTab === "time" && <TimeAnalytics />}
                        {activeTab === "trend" && <TrendAnalytics />}
                    </>
                )}
            </div>
        </div>
    );
} 