import Title from 'app/components/Title';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectWishlists } from './selectors';
import { actions } from './slice';
import WishlistForm from './WishlistForm';
import Wish from './Wish';
import './style.scss';
import Button from 'app/components/Button';
import ShareOutline from 'app/icons/ShareOutline';
import { makeSelectUserEmail } from 'app/providers/AuthProvider/selectors';
import { buildMessageFromDev, successNotification } from 'utils/notifications';
import { useRouteMatch } from 'react-router';

export default function WishlistOverview(): JSX.Element {
  const { t } = useTranslation();
  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();
  const userEmail = useSelector(makeSelectUserEmail);

  const wishlists = useSelector(selectWishlists);
  useEffect(() => {
    dispatch(actions.loadWishlists());
  }, []);
  const handleWishlistLinkCopy = () => {
    const sharedWishlistLink = window.origin + `${url}/users/` + userEmail;
    navigator.clipboard.writeText(sharedWishlistLink).then(function () {
      successNotification(buildMessageFromDev(t('wishlistLinkCopied')));
    }, function (err) {});
  }
  return (
    <>
      <Helmet>
        <title>{t('wishlistTitle')}</title>
        <meta name="description" content={t('wishlistDescription')} />
      </Helmet>
      <div className="wishlist-header-row">
        <Title>{t('wishlistTitle')}</Title>
        <Button onClick={handleWishlistLinkCopy} kind="icon"><ShareOutline/></Button>
      </div>
      <WishlistForm />
      <div className="wishes">
        {wishlists.map(wish => (
          <Wish key={wish.title} {...wish} showControls={true} />
        ))}
      </div>
    </>
  );
}
