// src/components/molecules/FormInput.jsx
import React from "react";
import { Form } from "react-bootstrap";

function Input({ id, label, type = "text", as = "input", rows, value, onChange }) {
  return (
    <Form.Group controlId={id} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as={as}
        type={type}
        rows={rows}
        value={value}
        onChange={onChange}
        required
      />
    </Form.Group>
  );
}

export default Input;
