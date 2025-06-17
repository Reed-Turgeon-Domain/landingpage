import React from 'react';

export const Button = ({ color }: { color: string }) => {
  return <button className={`bg-${color}-500 text-white p-2 rounded-md`}>Click me</button>;
  
  // return <button style={{ backgroundColor: color }}>Click me</button>;
};