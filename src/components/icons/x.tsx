import React from 'react';

interface XProps {
  color?: string;
  size?: number;
}

export default function X({ color = 'rgb(108 118 136)', size = 12 }: XProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 4L4 12M4 4L12 12'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
