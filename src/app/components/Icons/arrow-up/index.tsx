function IconArrowUp(props: any): JSX.Element {
  return (
    <svg
      stroke="var(--text)"
      fill="var(--text)"
      strokeWidth={0}
      viewBox="0 0 16 16"
      height="1.5em"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 6.5L7.5 4h.7l2.5 2.5-.7.71-1.65-1.64v5.57h-1V5.57L5.7 7.22 5 6.5z"
        stroke="none"
      />
    </svg>
  );
}

export default IconArrowUp;
