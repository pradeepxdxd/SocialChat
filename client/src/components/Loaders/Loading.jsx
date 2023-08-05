import React from 'react'
import './Loading.css'

const Loading = () => {
    return (
        <>
            <div className="center-loading">
                <div className="three-body">
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                </div>
            </div>
        </>
    );
};

export default Loading;