function ExternalLinkOutline(props) {
  return (
    <svg
      stroke="var(--text)"
      fill="var(--text)"
      strokeWidth={0}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g stroke="none">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M10 3v2H5v14h14v-5h2v6a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h6zm7.707 4.707L12 13.414 10.586 12l5.707-5.707L13 3h8v8l-3.293-3.293z" />
      </g>
    </svg>
  );
}

export default ExternalLinkOutline;
