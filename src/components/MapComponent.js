import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents, Marker, Popup } from 'react-leaflet';
import { createPin } from '../utils/api';
import L from 'leaflet';
import PinForm from './PinForm';
import 'leaflet/dist/leaflet.css';
import './MapStyle.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapEvents = ({ onMapClick }) => {
  const map = useMap();
  useMapEvents({
    click(e) {
      onMapClick(e.latlng, map);
    },
  });
  return null;
};

const MapView = ({ selectedPin }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedPin && selectedPin.position && selectedPin.position.lat !== undefined && selectedPin.position.lng !== undefined) {
      map.setView([selectedPin.position.lat, selectedPin.position.lng], map.getZoom());
    }else{
      console.log("selectedPin", selectedPin);
    }
  }, [selectedPin, map]);
};


const Map = ({ pins, addPin, selectedPin , setSelectedPin }) => {
  const [showForm, setShowForm] = useState(false);
  const [newPinPosition, setNewPinPosition] = useState(null);
  const [formPosition, setFormPosition] = useState(null);

  const handleMapClick = useCallback((latlng, map) => {
    console.log('Map Click:', latlng);
    setNewPinPosition(latlng);
    const point = map.latLngToContainerPoint(latlng);
    setFormPosition({ x: point.x, y: point.y });
    setShowForm(true);
  }, []);
  
  const handleFormSubmit = async (pinData) => {
    const newPin = {
      ...pinData,
      position: newPinPosition,
    };

    try {
      const createdPin = await createPin(newPin);
      console.log('Created Pin:', createdPin);
      addPin(createdPin);
    } catch (error) {
      console.error('Error creating pin:', error);
    } finally {
      setShowForm(false);
      setNewPinPosition(null);
      setFormPosition(null);
    }
  };


  
  const handleFormCancel = () => {
    setShowForm(false);
    setNewPinPosition(null);
    setFormPosition(null);
  };

  return (
    <div className="map-container">
      <MapContainer 
        center={[51.505, -0.09]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEvents onMapClick={handleMapClick} />
        <MapView selectedPin={selectedPin} />

        {pins.map((pin) => (
          pin.position && pin.position.lat !== undefined && pin.position.lng !== undefined && (
            <Marker 
              key={pin.id} 
              position={pin.position} 
              icon={pin.id === selectedPin?.id ? redIcon : new L.Icon.Default()}
            eventHandlers={{
              click: () => {
                setSelectedPin(pin);
              },
            }}
            >
              <Popup>
                <div className="pin-popup">
                  <p><strong>Story:</strong> {pin.story}</p>
                  {pin.address && <p><strong>Address:</strong> {pin.address}</p>}
                </div>
              </Popup>
            </Marker>
          )
        ))}


        {newPinPosition && (
          <Marker position={newPinPosition} />
        )}
      </MapContainer>
      {showForm && formPosition && (
        <PinForm
          position={formPosition}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default Map;