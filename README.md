
# Map Pin Tool

## Description
The Map Pin Tool is a full-stack web application enabling users to drop pins on a map, add descriptive stories (title, image, and remarks), and fetch addresses automatically for each pin location. Users can view, manage, and interact with pins through an intuitive interface, with local storage persistence for seamless usability.

---

## How to Run the Project

### Prerequisites
- Node.js installed on your system.
- A running MongoDB instance (local or cloud-based).
- Internet access for OpenStreetMap API.

### Steps to Run

#### Frontend
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/Jash2606/Talking-land-Frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Talking-land-Frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and visit `http://localhost:3000`.

#### [Backend](https://github.com/Jash2606/Talking-land-Backend)

1. Clone the backend repository:
   ```bash
   git clone https://github.com/Jash2606/Talking-land-Backend.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd Talking-land-Backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```env
   MONGO_URI=<your_mongo_connection_string>
   PORT=5000
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```
6. Ensure the frontend and backend are running simultaneously.

---

## What Tech We Used and Why

### Frontend
- **React**: For building a dynamic, component-based UI.
- **Leaflet (react-leaflet)**: To create an interactive map experience.
- **Tailwind CSS**: For clean and responsive UI design.
- **FormData**: To handle file uploads seamlessly.

### Backend
- **Node.js and Express.js**: For robust and scalable server-side development.
- **MongoDB**: To store pin data efficiently, including geolocation, titles, remarks, and images.
- **Multer**: For handling image uploads.
- **OpenStreetMap Nominatim API**: To fetch addresses via reverse geocoding.

### Why These Choices?
1. **React & Leaflet**: They integrate well for building interactive map applications.
2. **Node.js**: Efficient for building scalable and high-performing APIs.
3. **MongoDB**: Perfect for storing unstructured, geospatial data.
4. **Multer & FormData**: Simplify image upload and storage workflows.

---

## Creative Extras Added
- **Story Management**: Users can associate titles, descriptions, and images with pins.
- **Image Uploads**: Enhances the storytelling aspect of pins.
- **Dynamic Sidebar**: Provides an easy way to view and navigate all pins.
- **Local Storage Persistence**: Ensures that pins remain accessible across sessions.
- **Responsive Design**: Optimized for both desktop and mobile users.
- **Real-time Address Fetching**: Adds context to each pin via reverse geocoding.
- **Interactive UI Enhancements**: Form positioning dynamically adjusts based on window dimensions.

---

## Features
- Interactive map interface.
- Story creation with images, titles, and descriptions.
- Automatic address fetching for pin locations.
- Sidebar to view and manage pins.
- Image upload support.
- Local storage persistence across sessions.
- Responsive design for desktop and mobile users.

