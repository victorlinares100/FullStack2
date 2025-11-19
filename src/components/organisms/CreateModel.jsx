// src/components/organisms/CreateModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Input from '../molecules/Input';
import Button from '../atoms/Button';

function CreateModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  inputsConfig, 
  title, 
  submitText, 
  loading,
  initialData // Datos iniciales para edición
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Inicializa el formulario con los datos de edición o vacío
    if (initialData && Object.keys(initialData).length > 0) {
        // Mapea los datos iniciales a las claves esperadas por los inputs
        const initialFormState = {};
        inputsConfig.forEach(input => {
            // Usa el valor del input, si existe en initialData
            initialFormState[input.name] = initialData[input.name] || ''; 
        });
        setFormData(initialFormState);
    } else {
        // Reinicia el formulario para la creación
        const initialFormState = {};
        inputsConfig.forEach(input => {
            initialFormState[input.name] = '';
        });
        setFormData(initialFormState);
    }
  }, [initialData, inputsConfig, isOpen]); // Se ejecuta cuando cambia el modal o los datos

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    // Si es un input de tipo 'file', guarda el objeto File (o FileList)
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
              label={input.placeholder} // Usamos placeholder como label para simplicidad
              type={input.type}
              as={input.type === 'textarea' ? 'textarea' : 'input'}
              rows={input.type === 'textarea' ? 3 : undefined}
              value={input.type !== 'file' ? formData[input.name] || '' : undefined} // No controlamos el valor de 'file'
              onChange={handleChange}
              // Agregamos el atributo 'name' para que se use en el formData
              name={input.name} 
              // Si es un archivo, no mostramos el valor, solo el onChange
              className={input.className}
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