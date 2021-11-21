import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'; 
import './style.scss'; 
import { makeSelectUserEmail } from 'app/providers/AuthProvider/selectors';
import { useParams, useRouteMatch } from 'react-router';
import { selectLoading, selectOtherUserWishlist } from './selectors';
import { useEffect } from 'react';
import { actions } from './slice';
import { UserInfoWishlistParams } from './types';
import { Helmet } from 'react-helmet-async';
import Wish from './Wish';
import Title from 'app/components/Title';
import Subtitle from 'app/components/Subtitle';

export default function WishlistUserInfo(): JSX.Element {
  const { t } = useTranslation();
  const params = useParams<UserInfoWishlistParams>();
  const dispatch = useDispatch();
  
  const isLoading = useSelector(selectLoading);
  const wishlist = useSelector(selectOtherUserWishlist);
  useEffect(() => {
    dispatch(actions.loadOtherUserWishlist({id: params.userId}));
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('wishlistTitle')}</title>
        <meta name="description" content={t('wishlistDescription')} />
      </Helmet>
      <Title>{t('wishlistOfTheUser')}: {params.userId}</Title>
      {!isLoading && !wishlist.length && <Subtitle>{t('userHasNoWishes')}</Subtitle>}
      <div className="wishes">
        {wishlist.map(wish => (
          <Wish key={wish.title} showControls={false} {...wish} />
        ))}
      </div>
    </>
  );
}
