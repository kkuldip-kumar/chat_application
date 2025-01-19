import React from 'react';
import { Link } from 'react-router-dom';

const ServerErrorPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-6xl font-bold text-red-600">500</h1>
            <p className="mt-4 text-2xl text-gray-700">Internal Server Error</p>
            <p className="mt-2 text-lg text-gray-500">Something went wrong on our end. Please try again later.</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Go to Home
            </Link>
        </div>
    );
}

export default ServerErrorPage;
