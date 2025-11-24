import React from "react";

export default function Message({ time, isLeft, amount, note }) {
    // Define gradient backgrounds for sent and received messages
    const gradients = {
        sent: 'bg-gradient-to-br from-[#6366f1] to-[#4f46e5]',
        received: 'bg-[color:var(--nav-1-bg)]'
    };

    return (
        <div className={`flex flex-col ${isLeft ? 'items-start' : 'items-end'}`}>
            <div className={`max-w-[60%] ${isLeft ? 'mr-12' : 'ml-12'}`}>
                <div className={`
                    rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300
                    ${isLeft ? gradients.received : gradients.sent}
                    ${isLeft ? 'border border-[color:var(--border-color)]' : ''}
                `}>
                    {/* Amount Section */}
                    <div className={`
                        px-4 py-2 flex items-center gap-2
                        ${isLeft ? 'border-b border-[color:var(--border-color)]' : 'border-b border-white/10'}
                    `}>
                        <span className={`
                            text-base font-semibold
                            ${isLeft ? 'text-[color:var(--text-color)]' : 'text-white'}
                        `}>
                            ₹{Number(amount).toLocaleString()}
                        </span>
                    </div>

                    {/* Note Section */}
                    {note && (
                        <div className="px-4 py-2">
                            <p className={`
                                text-sm
                                ${isLeft ? 'text-[color:var(--nav-text)]' : 'text-white/90'}
                            `}>
                                {note}
                            </p>
                        </div>
                    )}
                </div>

                {/* Time */}
                <div className="mt-1 px-2">
                    <span className="text-[11px] text-[color:var(--nav-text)]">
                        {time}
                    </span>
                </div>
            </div>
        </div>
    );
}