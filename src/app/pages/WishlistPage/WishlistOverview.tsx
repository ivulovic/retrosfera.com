import Title from 'app/components/Title';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectWishlists } from './selectors';
import { actions } from './slice';
import WishlistForm from './WishlistForm';
import Wish from './Wish';
import './style.scss';
import Button from 'app/components/Button';
import ShareOutline from 'app/icons/ShareOutline';
import { makeSelectUserEmail } from 'app/providers/AuthProvider/selectors';
import { buildMessageFromDev, successNotification } from 'utils/notifications';
import { useRouteMatch } from 'react-router';
import { copyToClipboard } from 'utils/copyToClipboard';
import Subtitle from 'app/components/Subtitle';

export default function WishlistOverview(): JSX.Element {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const userEmail = useSelector(makeSelectUserEmail);
  const isLoading = useSelector(selectLoading);
  const wishlist = useSelector(selectWishlists);

  useEffect(() => {
    dispatch(actions.loadWishlists());
    return (): void => {
      dispatch(actions.clearWishlistPageState());
    };
  }, []);

  const handleWishlistLinkCopy = () => {
    const sharedWishlistLink = window.origin + `${url}/users/` + userEmail;
    copyToClipboard(sharedWishlistLink, () =>
      successNotification(buildMessageFromDev(t('wishlistLinkCopied'))),
    );
  };

  return (
    <>
      <Helmet>
        <title>{t('wishlistTitle')}</title>
        <meta name="description" content={t('wishlistDescription')} />
      </Helmet>
      <div className="wishlist-header-row">
        <Title>{t('wishlistTitle')}</Title>
        <Button onClick={handleWishlistLinkCopy} kind="icon">
          <ShareOutline />
        </Button>
      </div>
      <WishlistForm />
      <div className="no-results">
        {!isLoading && !wishlist.length && <Subtitle>{t('noWishes')}</Subtitle>}
      </div>
      <div className="wishes">
        {wishlist.map(wish => (
          <Wish key={wish.title} {...wish} showControls={true} />
        ))}
      </div>
    </>
  );
}
