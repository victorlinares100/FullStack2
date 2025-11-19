// src/components/organisms/CreateModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Input from '../atoms/Input'; 
import Button from '../atoms/Button';

function CreateModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  inputsConfig, 
  title, 
  submitText, 
  loading,
  initialData 
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialFormState = {};
    inputsConfig.forEach(input => {
      const initialValue = initialData[input.name] || '';
      initialFormState[input.name] = initialValue; 
    });
    setFormData(initialFormState);

  }, [initialData, inputsConfig, isOpen]); 

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const inputValue = type === 'file' ? files[0] : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {inputsConfig.map((input) => (
            <Input
              key={input.name}
              id={input.name}
              label={input.placeholder}
              type={input.type}
              as={input.type === 'textarea' ? 'textarea' : 'input'}
              rows={input.type === 'textarea' ? 3 : undefined}
              value={input.type !== 'file' ? String(formData[input.name] || '') : undefined}
              
              onChange={handleChange}
              name={input.name} 
              className={input.className}
              required={input.required} 
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : submitText}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateModal;