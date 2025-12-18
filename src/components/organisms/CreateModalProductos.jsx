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
      if (input.type === "select") {
        initial[input.name] = initialData[`${input.name}Id`] || "";
      } else {
        initial[input.name] = initialData[input.name] || "";
      }

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
    const dataToSend = { ...formData };
    inputsConfig.forEach((input) => {
      if (input.type === "select") {
        dataToSend[input.name] = formData[input.name] ? parseInt(formData[input.name]) : null;
      }
    });
    onSubmit(dataToSend);
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
                  {formData[`${input.name}Preview`] && (
                    <div
                      style={{
                        width: 120,
                        height: 120,
                        marginTop: 8,
                        overflow: "hidden",
                        borderRadius: 8,
                        border: "1px solid #ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={formData[`${input.name}Preview`]}
                        alt="Previsualización"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  )}
                  {uploadingImage && <p style={{ fontSize: 12, color: "#2563EB", marginTop: 4 }}>Subiendo imagen...</p>}
                </div>
              );
            }

            if (input.type === "select") {
              return (
                <Form.Group key={input.name} className="mb-3">
                  <Form.Label>{input.placeholder}</Form.Label>
                  <Form.Select
                    name={input.name}
                    value={formData[input.name] || ""}
                    onChange={handleChange}
                    required={input.required}
                  >
                    <option value="">Seleccione...</option>
                    {input.options?.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.nombre || opt.nombreMarca || opt.tipoCategoria || opt.tipoTalla}
                      </option>
                    ))}
                  </Form.Select>
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
          <Button
            onClick={onClose}
            disabled={uploadingImage}
            style={{ backgroundColor: "#6B7280", borderColor: "#6B7280", color: "#fff" }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading || uploadingImage}
            style={{ backgroundColor: "#2563EB", borderColor: "#2563EB", color: "#fff" }}
          >
            {loading ? "Guardando..." : submitText}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateModalProductos;