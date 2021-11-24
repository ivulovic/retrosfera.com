import './style.scss';

export default function LoadingIndicator() {
  return (
    <div className="centered-loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
