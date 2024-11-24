import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api/v1";

export async function fetchAddress(lat, lng) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Address not found';
    }
  }

export const fetchPins = async () => {
  // console.log('Fetching pins...');
  const response = await axios.get(`${API_BASE_URL}/pins`);
  // console.log("response" , response.data);
  return response.data;
};

export const createPin = async (pinData) => {
  console.log("image", pinData.image);
  const address = await fetchAddress(pinData.position.lat, pinData.position.lng);
  let formData = {
    title: pinData.title,
    story: pinData.description,
    lat: pinData.position.lat,
    lng: pinData.position.lng,
    image: pinData.image,
    address: address
  }
  
  console.log('formData', formData);
  const response = await axios.post(`${API_BASE_URL}/pins/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updatePin = async (updatedData) => {
  let formData = {};
  // console.log(updatedData._id)
  if (updatedData.title) formData.title = updatedData.title;
  if (updatedData.image) formData.image = updatedData.image;
  if (updatedData.description) formData.description = updatedData.description;
  if (updatedData.remarks) formData.remarks = updatedData.remarks;
  if (updatedData.position) {
    formData.position = {};
    if (updatedData.position.lat) formData.position.lat = updatedData.position.lat;
    if (updatedData.position.lng) formData.position.lng = updatedData.position.lng;
  }

  console.log('formData in updatePin', formData);

  const response = await axios.put(`${API_BASE_URL}/pins/${updatedData._id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  // console.log("Response", response.data);
  return response.data;
};