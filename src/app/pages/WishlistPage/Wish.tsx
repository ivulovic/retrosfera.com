import Button from 'app/components/Button';
import ExternalLinkOutline from 'app/icons/ExternalLinkOutline';
import RemoveOutline from 'app/icons/RemoveOutline';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import noImage from 'app/images/no-photo.png';
import { buildMessageFromDev, successNotification } from 'utils/notifications';
import { actions } from './slice';

export default function Wish(props): JSX.Element {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const wish = { ...props };
  if (!props.image.startsWith('https')) {
    if (props.image !== 'UNKNOWN') {
      wish.image = 'https://' + props.image;
    } else {
      wish.image = noImage;
    }
  }
  const handleRemove = () => {
    dispatch(actions.removeWishlist(wish._id));
    successNotification(buildMessageFromDev(t('wishRemoved')));
  };
  return (
    <div className="wish">
      <div className="wish-title">{wish.title}</div>
      <div
        className="wish-media"
        style={{ backgroundImage: `url(${wish.image})` }}
      />
      <div className="wish-controls">
        <Button kind="icon">
          <a className="link" href={wish.url} target="_blank" rel="noreferrer">
            <ExternalLinkOutline />
          </a>
        </Button>
        {props.showControls && (
          <Button kind="icon" onClick={handleRemove}>
            <RemoveOutline />
          </Button>
        )}
      </div>
    </div>
  );
}
