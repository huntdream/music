import React from 'react';

interface Props {
  active?: boolean;
}

const Library: React.FC<Props> = ({ active }) => {
  if (active) {
    return (
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 24 24'
        preserveAspectRatio='xMidYMid meet'
      >
        <g>
          <path d='M18,21H3V6h1v14h14V21z M21,3v15H6V3H21z M16,6h-3v5.28C12.7,11.11,12.37,11,12,11c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2V8 h2V6z'></path>
        </g>
      </svg>
    );
  }

  return (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 24 24'
      preserveAspectRatio='xMidYMid meet'
    >
      <g>
        <path d='M16,6v2h-2v5c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2c0.37,0,0.7,0.11,1,0.28V6H16z M18,20H4V6H3v15h15V20z M21,3H6v15h15V3z M7,4h13v13H7V4z'></path>
      </g>
    </svg>
  );
};

export default Library;
