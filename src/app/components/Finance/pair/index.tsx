import './style.scss';

export default function FinancePair(props: any) {
  const { pair } = props;
  let data: Array<string> = [];
  if (pair.includes(':')) {
    data = pair.split(':');
  } else {
    data = [pair.slice(0, pair.length - 3), pair.slice(-3)];
  }
  return (
    <span className="finance-pair">
      {data[0]}&nbsp;<span>{data[1]}</span>
    </span>
  );
}
