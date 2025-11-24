import React from 'react';
import Message from './Message';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-[color:var(--primary-bg)] flex items-center justify-center p-4">
            <Message />
        </div>
    );
}