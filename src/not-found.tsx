import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="mt-4 text-2xl text-gray-700">Page Not Found</p>
            <p className="mt-2 text-lg text-gray-500">The page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Go to Home
            </Link>
        </div>
    );
}

export default NotFoundPage;
