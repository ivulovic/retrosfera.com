import Card from 'app/components/Card';
import Subtitle from 'app/components/Subtitle';
import Title from 'app/components/Title';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import wishlistComputer from 'app/images/wishlist-preview.png';
import cryptoexchangeComputer from 'app/images/cryptoexchange-preview.png';
// import img from 'app/images/demoapp.png';
import { useSelector } from 'react-redux';
import { makeSelectIsUserAuthenticated } from 'app/providers/AuthProvider/selectors';

export default function ApplicationOverview(): JSX.Element {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const isUserLoggedIn = useSelector(makeSelectIsUserAuthenticated);
  const linkLabel = isUserLoggedIn ? 'moreInfo' : 'loginToSeeApplication';
  const cards = [
    {
      id: 'wishlist',
      title: t('wishlistTitle'),
      description: t('wishlistDescription'),
      img: wishlistComputer,
      url: `${url}/wishlist`,
      link: t(linkLabel),
    },
    {
      id: 'cryptoexchange',
      title: t('cryptoexchangeTitle'),
      description: t('cryptoexchangeDescription'),
      img: cryptoexchangeComputer,
      url: `${url}/cryptoexchange`,
      link: t(linkLabel),
    },
    // {
    //   id: 'organizer',
    //   title: t('organizerTitle'),
    //   description: t('wishlistDescription'),
    //   img: img,
    //   url: `${url}/planner`,
    //   link: t(linkLabel),
    // },
    // {
    //   id: 'blog',
    //   title: t('blogTitle'),
    //   description: t('wishlistDescription'),
    //   img: img,
    //   url: `${url}/blogger`,
    //   link: t(linkLabel),
    // },
    // {
    //   id: 'notes',
    //   title: t('notesTitle'),
    //   description: t('notesDescription'),
    //   img: img,
    //   url: `${url}/notes`,
    //   link: t(linkLabel),
    // },
  ];
  return (
    <div>
      <Title>{t('applications')}</Title>
      <Subtitle>{t('applicationsDescription')}</Subtitle>
      <div className="card-list">
        {cards.map(card => (
          <Card {...card} key={card.id} />
        ))}
      </div>
    </div>
  );
}
