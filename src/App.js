import React, { useState, useEffect } from 'react';
import Map from './components/MapComponent';
import Sidebar from './components/Sidebar';
import { fetchAddress , fetchPins } from './utils/api';
import './App.css';

const App = () => {
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);

  useEffect(() => {
    const savedPins = JSON.parse(localStorage.getItem('pins')) || [];
    const loadPins = async () => {
      try {
        const fetchedPins = await fetchPins();
        setPins(fetchedPins);
      } catch (error) {
        console.error('Error fetching pins:', error);
      }
    };
  
    loadPins();
  }, []);
  
  const addPin = async (newPin) => {
    const address = await fetchAddress(newPin.position.lat, newPin.position.lng);
    const pinWithAddress = { ...newPin, address };
    setPins([...pins, pinWithAddress]);
  };


  const selectPin = (pin) => {
    setSelectedPin(pin);
  };

  return (
    <div className="app">
      <Sidebar 
        pins={pins} 
        selectPin={selectPin}
        selectedPin={selectedPin}
      />
      <Map 
        pins={pins} 
        addPin={addPin} 
        selectedPin={selectedPin}
        setSelectedPin={setSelectedPin}
      />
    </div>
  );
};

export default App;