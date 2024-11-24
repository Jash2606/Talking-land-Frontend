import React from 'react';
import './SidebarStyle.css';
import { Buffer } from 'buffer';

const Sidebar = ({ pins, selectPin, selectedPin }) => {
  
  const getImageUrl = (image) => {
    if (image && image.data && image.data.data) {
      const base64String = Buffer.from(image.data.data).toString('base64');
      return `data:${image.contentType};base64,${base64String}`;
    }
    return null;
  };

  return (
    <div className="sidebar">
      <h2>Saved Pins</h2>
      <ul className="pin-list">
        {pins.map((pin) => (
          <li
            key={pin._id}
            className={`pin-item ${selectedPin && selectedPin._id === pin._id ? 'selected' : ''}`}
            onClick={() => selectPin(pin)}
          >
            <h3 className="pin-title">{pin.title || 'Untitled Pin'}</h3>
            {pin.image && (
              <div className="pin-image-container">
                <img
                  src={getImageUrl(pin.image)}
                  alt="Pin preview"
                  className="pin-image"
                />
              </div>
            )}
            <p className="pin-story">
              <strong> Story: </strong> {pin.story || 'No story provided.'}
            </p>
            {pin.address && pin.address.trim() && (
              <p className="pin-address">
                <strong> Address: </strong> {pin.address}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
