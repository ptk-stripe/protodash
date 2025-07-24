import React from 'react';

interface ArrowUpDownProps {
  style?: React.CSSProperties;
}

export default function ArrowUpDown({ style }: ArrowUpDownProps) {
  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={style}
    >
      <g id='NextIcon__xsmall--arrowUpDown'>
        <g id='icon'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M1.92637 7.24264C2.23422 6.92572 2.7407 6.91838 3.05762 7.22623L6.00023 10.0847L8.94277 7.22628C9.25969 6.91842 9.76617 6.92577 10.074 7.24269C10.3819 7.5596 10.3745 8.06608 10.0576 8.37394L6.55765 11.7738C6.40243 11.9246 6.20133 12 6.00023 12C5.79912 12 5.59802 11.9246 5.4428 11.7738L1.94277 8.37389C1.62586 8.06604 1.61851 7.55956 1.92637 7.24264Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5.4428 0.226231C5.59802 0.0754521 5.79912 6.21894e-05 6.00022 6.10352e-05C6.20133 5.98809e-05 6.40243 0.0754516 6.55765 0.226236L10.0576 3.62619C10.3745 3.93405 10.3819 4.44052 10.074 4.75744C9.76616 5.07435 9.25968 5.0817 8.94277 4.77384L6.00022 1.91538L3.05762 4.77384C2.7407 5.0817 2.23422 5.07435 1.92637 4.75743C1.61851 4.44052 1.62586 3.93404 1.94277 3.62618L5.4428 0.226231Z'
            fill='currentColor'
          />
        </g>
      </g>
    </svg>
  );
}
