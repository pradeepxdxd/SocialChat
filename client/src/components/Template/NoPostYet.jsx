import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import './css/NoPostYet.css';

const CameraLogo = () => {
  return (
    <div className="camera-logo">
      <FontAwesomeIcon icon={faCamera} />
      <p className="no-post-text">No Post Yet</p>
    </div>
  );
};

export default CameraLogo;
