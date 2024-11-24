import React, { useState, useEffect, useRef } from 'react';
import './PinFormStyle.css';

const PinForm = ({ position, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current && position) {
      const { current: form } = formRef;
      const rect = form.getBoundingClientRect();
      const { innerHeight: windowHeight, innerWidth: windowWidth } = window;

      let top = position.y;
      let left = position.x;

      if (top + rect.height > windowHeight) {
        top = windowHeight - rect.height - 10;
      }
      if (left + rect.width > windowWidth) {
        left = windowWidth - rect.width - 10;
      }

      form.style.top = `${top}px`;
      form.style.left = `${left}px`;
    }
  }, [position]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, image, description });
    setTitle('');
    setImage(null);
    setDescription('');
  };  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="pin-form-container" ref={formRef}>
      <form className="pin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
        <input
          type="file"
          onChange={handleImageChange}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PinForm;