// src/components/organisms/CreateModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Input from '../atoms/Input'; 
import InputFile from '../atoms/InputFile';
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

    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {inputsConfig.map((input) => {
            if (input.type === "file") {
              return (
                <div key={input.name} className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {input.placeholder}
                  </label>

                  <InputFile
                    onChange={(e) => {
                      const file = e.target.files[0];

                      setFormData(prev => ({
                        ...prev,
                        [input.name]: file,
                      }));

                      // Crear preview
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setFormData(prev => ({
                            ...prev,
                            [`${input.name}Preview`]: reader.result,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    preview={formData[`${input.name}Preview`] || null}
                  />
                </div>
              );
            }

            return (
              <Input
                key={input.name}
                id={input.name}
                label={input.placeholder}
                type={input.type}
                as={input.type === 'textarea' ? 'textarea' : 'input'}
                rows={input.type === 'textarea' ? 3 : undefined}
                value={formData[input.name] || ''}
                onChange={handleChange}
                name={input.name}
                className={input.className}
                required={input.required}
              />
            );
          })}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : submitText}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateModal;
