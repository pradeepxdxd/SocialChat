import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/IconWithNumber.css';

const IconWithNumber = ({ icon, number }) => {
    return (
        <div className="icon-with-number">
            <FontAwesomeIcon icon={icon} className="icon" />
            {
                number > 0 && <span className="number">{number}</span>
            }
        </div>
    );
};

export default IconWithNumber;
