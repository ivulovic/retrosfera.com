import Card from 'app/components/Card';
import Subtitle from 'app/components/Subtitle';
import { Title } from 'app/pages/HomePage/components/Title';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import img from 'app/images/demoapp.png';

export default function ApplicationOverview(): JSX.Element {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const cards = [
    {id: 'wishlist', title: t('wishlistTitle'), description:  t('wishlistDescription'), img: img, url: `${url}/wishlist`, link: t('moreInfo')},
    {id: 'cryptonium', title: t('cryptoniumTitle'), description:  t('cryptoniumDescription'), img: img, url: `${url}/cryptonium`, link: t('moreInfo')},
    {id: 'organizer', title: t('organizerTitle'), description:  t('wishlistDescription'), img: img, url: `${url}/planner`, link: t('moreInfo')},
    {id: 'blog', title: t('blogTitle'), description:  t('wishlistDescription'), img: img, url: `${url}/blogger`, link: t('moreInfo')},
    {id: 'notes', title: t('notesTitle'), description:  t('notesDescription'), img: img, url: `${url}/notes`, link: t('moreInfo')},
  ];
  /**
    Usluge:
    Zelite da imate blog na svom domenu? Kontaktirajte nas, jer mi pruzamo usluge postavljanja i odrzavanja aplikacija na internetu.
    Na nasim platformama cete moci da pisete/brisete/menjate svoj sadrzaj.
  */
  return <div>
    <Title>{t('applications')}</Title>
    <Subtitle>{t('applicationsDescription')}</Subtitle>
    <div className="card-list">
      {cards.map(card => <Card {...card} key={card.id}/>)}
    </div>
  </div>
}