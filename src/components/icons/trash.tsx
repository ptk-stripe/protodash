import React from 'react';

interface TrashIconProps {
  className?: string;
}

export default function TrashIcon({ className }: TrashIconProps) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g id='NextIcon--trash'>
        <g id='icon'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.5 3V1C11.5 0.447715 11.0523 0 10.5 0H5.5C4.94772 0 4.5 0.447715 4.5 1V3H0.75C0.335786 3 0 3.33579 0 3.75C0 4.16421 0.335786 4.5 0.75 4.5H1.5V13C1.5 14.6569 2.84315 16 4.5 16H11.5C13.1569 16 14.5 14.6569 14.5 13V4.5H15.25C15.6642 4.5 16 4.16421 16 3.75C16 3.33579 15.6642 3 15.25 3H11.5ZM6 1.5V3H10V1.5H6ZM13 4.5H3V13C3 13.8284 3.67157 14.5 4.5 14.5H11.5C12.3284 14.5 13 13.8284 13 13V4.5Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6.25 6.5C6.66421 6.5 7 6.83579 7 7.25V11.75C7 12.1642 6.66421 12.5 6.25 12.5C5.83579 12.5 5.5 12.1642 5.5 11.75V7.25C5.5 6.83579 5.83579 6.5 6.25 6.5Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9.75 6.5C10.1642 6.5 10.5 6.83579 10.5 7.25V11.75C10.5 12.1642 10.1642 12.5 9.75 12.5C9.33579 12.5 9 12.1642 9 11.75V7.25C9 6.83579 9.33579 6.5 9.75 6.5Z'
            fill='currentColor'
          />
        </g>
      </g>
    </svg>
  );
}
