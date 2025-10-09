// src/components/atoms/AlertMessage.jsx
import React from "react";
import { Alert } from "react-bootstrap";

function Mensaje({ variant = "info", text, onClose }) {
  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      {text}
    </Alert>
  );
}

export default Mensaje;
