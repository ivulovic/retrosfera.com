function IconArrowDown(props: any): JSX.Element {
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
        d="M10.7 8.64l-2.5 2.5h-.7L5 8.64l.7-.71 1.65 1.64V4h1v5.57L10 7.92l.7.72z"
        stroke="none"
      />
    </svg>
  );
}

export default IconArrowDown;
