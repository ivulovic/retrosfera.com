import './style.scss';
import { Link } from 'react-router-dom';
import Title from 'app/components/Title';
import Subtitle from 'app/components/Subtitle';
import { CardProps } from './types';

export default function Card(props: CardProps): JSX.Element {
  return (
    <div className="card">
      <div
        className="card-media"
        style={{ backgroundImage: `url(${props.img})` }}
      ></div>
      <div className="card-info">
        <div>
          <Title>{props.title}</Title>
          <Subtitle>{props.description}</Subtitle>
        </div>
        <Link to={props.url} className="link">
          {props.link}
        </Link>
      </div>
    </div>
  );
}
