import React from "react";
import { Form } from "react-bootstrap";

function Input({ id, label, type = "text", as = "input", rows, value, onChange, error }) {
  return (
    <Form.Group controlId={id} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as={as}
        type={type}
        rows={rows}
        value={value}
        onChange={onChange}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default Input;
