import React from 'react';

const colorClasses = {
  red: 'bg-red-500 hover:bg-red-600',
  blue: 'bg-blue-500 hover:bg-blue-600',
  green: 'bg-green-500 hover:bg-green-600',
  transparent: 'bg-transparent hover:bg-transparent',
};

type ButtonProps = {
  /**
   * The background color of the button
   */
  backgroundColor?: keyof typeof colorClasses;
  /**
   * The text color of the button
   */
  textColor?: 'white' | 'black';
  /**
   * The border style of the button
   */
  border?: string | null;
  /**
   * The border color of the button
   */
  borderColor?: string | null;
  /**
   * The border radius of the button
   */
  rounded?: string | null;
  /**
   * Optional click handler
   */
  onClick?: () => void;
};

export const Button = ({ 
  onClick,
  backgroundColor = 'transparent',
  textColor = 'black',
  border = 'border-2 border-black',
  borderColor = 'border-black',
  rounded = 'rounded-md',  
}: ButtonProps) => {
  const buttonClasses = `
    ${backgroundColor && colorClasses[backgroundColor]} 
    text-${textColor} 
    ${border && border}
    ${borderColor && borderColor}
    ${rounded && rounded}
    p-2 
    transition-colors
    duration-300
  `;

  return (
    <button className={buttonClasses}
      onClick={onClick}
    >
      Click me
    </button>
  );
};

// return <button style={{ backgroundColor: color }}>Click me</button>;