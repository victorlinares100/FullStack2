import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

function Button({ text, children, className = "", ...props }) {
  const baseClass = "px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 border-0";
  
  return (
    <BootstrapButton 
      {...props} 
      className={`${baseClass} ${className}`}
    >
      {text || children}
    </BootstrapButton>
  );
}

export default Button;