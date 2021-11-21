import './style.scss';

export default function Button(props): JSX.Element {
  const { children, kind = 'primary', ...rest } = props;
  return (
    <button className={`button ${kind}`} {...rest}>
      {children}
    </button>
  );
}
