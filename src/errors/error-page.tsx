import { useRouteError } from "react-router-dom";
import React from 'react';

interface RouteError {
    statusText?: string;
    message?: string;
}

const ErrorPage: React.FC = () => {
    // const error = useRouteError() as RouteError;
    // console.error(error);

    return (
        <div id="error-page" className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
            <p className="mt-4 text-2xl text-gray-700">Sorry, an unexpected error has occurred.</p>
            {/* <p className="mt-2 text-lg text-gray-500">
                <i>{error?.statusText || error?.message}</i>
            </p> */}
            <a href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Go to Home
            </a>
        </div>
    );
}

export default ErrorPage;
