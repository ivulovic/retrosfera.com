function IconArrowNeutral(props: any): JSX.Element {
  return (
    <svg
      stroke="var(--text)"
      fill="var(--text)"
      strokeWidth={0}
      viewBox="0 0 24 24"
      height="1.5em"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M9 9h6v6H9z" stroke="none" />
    </svg>
  );
}

export default IconArrowNeutral;
