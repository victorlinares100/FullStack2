// src/components/molecules/FormInput.jsx
import React from "react";
import { Form } from "react-bootstrap";

// 💡 Agrega 'name' a los props.
function Input({ id, label, type = "text", as = "input", rows, value, onChange, name }) {
  // Manejo especial para inputs de archivo (file)
  const controlProps = type === "file" 
    ? { onChange, type, required: true } // No se le pasa 'value' ni 'as'
    : {
        as: as,
        type: type,
        rows: rows,
        // 💡 CRÍTICO: Asegúrate de que 'value' sea una cadena, si no, usa ''.
        // Esto previene errores de "uncontrolled input" en React.
        value: value || '', 
        onChange: onChange,
        required: true // Mantener el required
      };

  return (
    <Form.Group controlId={id} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...controlProps}
        // 💡 CRÍTICO: Agrega el atributo name aquí.
        name={name} 
      />
    </Form.Group>
  );
}

export default Input;