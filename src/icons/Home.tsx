import React from 'react';

interface Props {
  active?: boolean;
}

const Home: React.FC<Props> = ({ active }) => {
  if (active) {
    return (
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 24 24'
        preserveAspectRatio='xMidYMid meet'
      >
        <g>
          <path d='M4,10V21h6V15h4v6h6V10L12,3Z'></path>
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
        <path d='M12,4.33l7,6.12V20H15V14H9v6H5V10.45l7-6.12M12,3,4,10V21h6V15h4v6h6V10L12,3Z'></path>
      </g>
    </svg>
  );
};

export default Home;
