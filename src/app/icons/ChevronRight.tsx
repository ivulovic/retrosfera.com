import * as React from 'react';

const ChevronRight = props => (
  <svg
    stroke="var(--text)"
    fill="none"
    strokeWidth={2}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default ChevronRight;
