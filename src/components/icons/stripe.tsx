import React from 'react';

type StripeProps = {
  width?: number;
  height?: number;
  radius?: number;
};

export default function Stripe({
  width = 32,
  height = 32,
  radius = 8,
}: StripeProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        width={width}
        height={height}
        rx={radius}
        transform='translate(0 0.000244141)'
        fill='#6772E5'
      />
      <path
        d='M14.5632 12.3279C14.5632 11.5495 15.2018 11.2502 16.2596 11.2502C17.7765 11.2502 19.6925 11.7092 21.2093 12.5275V7.83728C19.5528 7.17865 17.9162 6.91919 16.2596 6.91919C12.2081 6.91919 9.51367 9.03478 9.51367 12.5674C9.51367 18.0759 17.0979 17.1978 17.0979 19.5728C17.0979 20.4909 16.2995 20.7903 15.1819 20.7903C13.5253 20.7903 11.4097 20.1117 9.73321 19.1936V23.9437C11.5893 24.7421 13.4654 25.0814 15.1819 25.0814C19.3332 25.0814 22.1873 23.0256 22.1873 19.4531C22.1673 13.5055 14.5632 14.5633 14.5632 12.3279Z'
        fill='white'
      />
    </svg>
  );
}
