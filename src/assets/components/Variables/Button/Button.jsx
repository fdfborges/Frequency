import React from 'react';
import './Button.scss';

const Button = ({label, onClick, className, type = 'button'}) => {
    return(
        <button className={`button ${className}`} type='type' onClick={onClick}>{label}</button>
    );
};

export default Button;