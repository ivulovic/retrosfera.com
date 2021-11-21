import './style.scss';

export default function Input(props): JSX.Element {
  const { label, id, ...rest } = props;
  return (
    <div className="input-wrapper">
      {label && <label htmlFor={id}>{label}</label>}
      <input {...rest} id={id} />
    </div>
  );
}
