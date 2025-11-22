import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

function Button({ text, children, ...props }) {
  return <BootstrapButton {...props}>{text || children}</BootstrapButton>;
}

export default Button;
