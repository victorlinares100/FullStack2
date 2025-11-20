// src/components/organisms/CreateModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import InputFile from '../atoms/InputFile';
import Button from '../atoms/Button';
import { uploadToImgBB } from '../../utils/uploadImage';

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
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const initialFormState = {};
    inputsConfig.forEach(input => {
      const initialValue = initialData[input.name] || '';
      initialFormState[input.name] = initialValue;
    });
    setFormData(initialFormState);
  }, [initialData, inputsConfig, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e, inputName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const { url, preview } = await uploadToImgBB(file);

      setFormData(prev => ({
        ...prev,
        [inputName]: url,                
        [`${inputName}Preview`]: preview,
      }));
    } catch (err) {
      alert("Error al subir imagen: " + err.message);
    } finally {
      setUploadingImage(false);
    }
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
                    onChange={(e) => handleImageUpload(e, input.name)}
                    disabled={uploadingImage}
                    preview={formData[`${input.name}Preview`] || formData[input.name] || null}
                  />

                  {uploadingImage && (
                    <p className="text-xs text-blue-600 mt-1">Subiendo imagen...</p>
                  )}
                </div>
              );
            }

            return (
              <Form.Group key={input.name} className="mb-3">
                <Form.Label>{input.placeholder}</Form.Label>

                <Form.Control
                  name={input.name}
                  type={input.type}
                  as={input.type === "textarea" ? "textarea" : "input"}
                  rows={input.type === "textarea" ? 3 : undefined}
                  value={formData[input.name] || ""}
                  onChange={handleChange}
                  required={input.required}
                />
              </Form.Group>
            );
          })}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={uploadingImage}>
            Cancelar
          </Button>

          <Button type="submit" disabled={loading || uploadingImage}>
            {loading ? "Guardando..." : submitText}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateModal;
