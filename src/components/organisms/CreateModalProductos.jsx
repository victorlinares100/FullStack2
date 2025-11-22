import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import InputFile from "../atoms/InputFile";
import Button from "../atoms/Button";
import { uploadToImgBB } from "../../utils/uploadImage";

function CreateModalProductos({
  isOpen,
  onClose,
  onSubmit,
  inputsConfig = [],
  title = "Crear producto",
  submitText = "Guardar",
  loading = false,
  initialData = {},
}) {
  const [formData, setFormData] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const initial = {};
    inputsConfig.forEach((input) => {
      initial[input.name] = initialData[input.name] || "";
      if (input.type === "file" && initialData[input.name]) {
        initial[`${input.name}Preview`] = initialData[input.name];
      }
    });
    setFormData(initial);
  }, [initialData, inputsConfig, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e, inputName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const { url, preview } = await uploadToImgBB(file);
      setFormData((prev) => ({
        ...prev,
        [inputName]: url,
        [`${inputName}Preview`]: preview,
      }));
    } catch (error) {
      alert("Error al subir imagen: " + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // enviamos DTO
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
                <div key={input.name} className="mb-3">
                  <Form.Label>{input.placeholder}</Form.Label>
                  <InputFile
                    onChange={(e) => handleImageUpload(e, input.name)}
                    disabled={uploadingImage}
                    preview={formData[`${input.name}Preview`] || null}
                  />
                  {uploadingImage && <p className="text-xs text-blue-600 mt-1">Subiendo imagen...</p>}
                </div>
              );
            }

            if (input.type === "select") {
              return (
                <Form.Group key={input.name} className="mb-3">
                  <Form.Label>{input.placeholder}</Form.Label>
                  <Form.Control
                    as="select"
                    name={input.name}
                    value={formData[input.name] || ""}
                    onChange={handleChange}
                    required={input.required}
                  >
                    <option value="">Seleccione...</option>
                    {input.options?.map((opt) => (
                      <option key={opt.id} value={opt.tipo || opt.nombre || opt.id}>
                        {opt.tipo || opt.nombre || opt.id}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              );
            }

            return (
              <Form.Group key={input.name} className="mb-3">
                <Form.Label>{input.placeholder}</Form.Label>
                <Form.Control
                  name={input.name}
                  type={input.type}
                  value={formData[input.name] || ""}
                  onChange={handleChange}
                  required={input.required}
                />
              </Form.Group>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose} disabled={uploadingImage}>
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

export default CreateModalProductos;
