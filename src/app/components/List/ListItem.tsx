import { Fragment } from 'react';
import ListItemContent from './ListItemContent';
import './style.scss';

export default function ListItem({ icon: Icon, children }) {
  return (
    <li className="list-item">
      {Icon && <Icon className="list-item-icon" />}
      <ListItemContent>{children}</ListItemContent>
    </li>
  );
}
