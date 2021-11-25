import * as React from 'react';

function FinanceIcon(props: any): JSX.Element {
  return (
    <svg
      stroke="var(--text)"
      fill="var(--text)"
      strokeWidth={0}
      viewBox="0 0 48 48"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="var(--primary)" stroke="none">
        <path d="M19 22h10v20H19zM32 8h10v34H32zM6 30h10v12H6z" />
      </g>
      <g fill="var(--primary)" stroke="none">
        <path d="M11 8l10 10V8z" />
        <path d="M9.394 22.437l-2.828-2.828 9.969-9.969 2.828 2.828z" />
      </g>
    </svg>
  );
}

export default FinanceIcon;
