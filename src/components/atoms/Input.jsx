// src/components/molecules/FormInput.jsx
import React from "react";
import { Form } from "react-bootstrap";

function Input({ id, label, type = "text", as = "input", rows, value, onChange, name }) {
  const controlProps = type === "file" 
    ? { onChange, type, required: true } // No se le pasa 'value' ni 'as'
    : {
        as: as,
        type: type,
        rows: rows,
        value: value || '', 
        onChange: onChange,
        required: true 
      };

  return (
    <Form.Group controlId={id} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...controlProps}
        name={name} 
      />
    </Form.Group>
  );
}

export default Input;