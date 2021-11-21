import './style.scss';

export default function Subtitle({ children, type = '' }) {
  return <p className={`subtitle ${type}`}>{children}</p>;
}
