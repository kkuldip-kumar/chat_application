import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="custom-loader"></div>
        </div>
    );
};
