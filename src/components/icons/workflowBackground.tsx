import React from 'react';

export default function WorkflowBackground() {
  return (
    <svg
      data-testid='rf__background'
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
      }}
    >
      <pattern
        id='pattern-1undefined'
        x='12'
        y='3'
        width='20'
        height='20'
        patternUnits='userSpaceOnUse'
        patternTransform='translate(-1.5,-1.5)'
      >
        <circle cx='1.5' cy='1.5' r='1.5' fill='#eee'></circle>
      </pattern>
      <rect
        x='0'
        y='0'
        width='100%'
        height='100%'
        fill='url(#pattern-1undefined)'
      ></rect>
    </svg>
  );
}
