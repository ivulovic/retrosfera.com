import { CovidPageViewEnum } from 'app/pages/Covid19Page/types';

const AirQualityPage = {
  path: 'air-quality',
  results: [
    {
      title: 'airQualityTitle',
      description: 'airQualityDescription',
      link: '/air-quality',
    },
  ],
};

const Covid19Page = {
  path: 'covid19',
  results: [
    {
      title: 'coronaVirus',
      description: 'covid19Description',
      link: '/covid19',
    },
    {
      title: 'graphicView',
      description: 'graphicViewSubtitle',
      link: `/covid19`,
    },
    {
      title: 'ambulancesView',
      description: 'ambulancesViewSubtitle',
      link: `/covid19/${CovidPageViewEnum.Ambulances}`,
    },
  ],
};

const ApplicationsPage = {
  path: 'applications',
  results: [
    {
      title: 'applications',
      description: 'applicationsDescription',
      link: '/applications',
    },
    {
      title: 'wishlistTitle',
      description: 'wishlistDescription',
      link: '/applications/wishlist',
    },
    {
      title: 'cryptoexchangeTitle',
      description: 'cryptoexchangeDescription',
      link: '/applications/cryptoexchange',
    },
  ],
};

const makeElement = (title, options) => ({
  title,
  ...options,
});

const makeEnElement = (title, options) => ({
  ...makeElement(title, options),
  lang: 'en',
});

const makeSrElement = (title, options) => ({
  ...makeElement(title, options),
  lang: 'sr',
});

const db = [
  makeEnElement('corona', Covid19Page),
  makeEnElement('coronavirus', Covid19Page),
  makeEnElement('corona virus', Covid19Page),
  makeEnElement('covid', Covid19Page),
  makeEnElement('covid ambulances', Covid19Page),
  makeEnElement('ambulances', Covid19Page),
  makeEnElement('covid19', Covid19Page),
  makeEnElement('covid 19', Covid19Page),
  makeEnElement('apps', ApplicationsPage),
  makeEnElement('applications', ApplicationsPage),
  makeEnElement('wishlist', ApplicationsPage),
  makeEnElement('cryptoexchange', ApplicationsPage),
  makeEnElement('air quality', AirQualityPage),
  makeEnElement('air polution', AirQualityPage),
  //
  makeSrElement('корона', Covid19Page),
  makeSrElement('коронавирус', Covid19Page),
  makeSrElement('корона вирус', Covid19Page),
  makeSrElement('вирус корона', Covid19Page),
  makeSrElement('ковид', Covid19Page),
  makeSrElement('ковид амбуланте', Covid19Page),
  makeSrElement('амбуланте', Covid19Page),
  makeSrElement('ковид 19', Covid19Page),
  makeSrElement('ковид19', Covid19Page),
  makeSrElement('апликације', ApplicationsPage),
  makeSrElement('листа жеља', ApplicationsPage),
  makeSrElement('криптоберза', ApplicationsPage),
  makeSrElement('ваздух', AirQualityPage),
  makeSrElement('загађење ваздуха', AirQualityPage),
  makeSrElement('квалитет ваздуха', AirQualityPage),

  makeSrElement('virus korona', Covid19Page),
  makeSrElement('korona', Covid19Page),
  makeSrElement('koronavirus', Covid19Page),
  makeSrElement('korona virus', Covid19Page),
  makeSrElement('kovid', Covid19Page),
  makeSrElement('kovid ambulante', Covid19Page),
  makeSrElement('ambulante', Covid19Page),
  makeSrElement('kovid 19', Covid19Page),
  makeSrElement('kovid19', Covid19Page),
  makeSrElement('aplikacije', ApplicationsPage),
  makeSrElement('kriptoberza', ApplicationsPage),
  makeSrElement('lista želja', ApplicationsPage),
  makeSrElement('lista zelja', ApplicationsPage),
  makeSrElement('vazduh', AirQualityPage),
  makeSrElement('zagađenje vazduha', AirQualityPage),
  makeSrElement('zagadjenje vazduha', AirQualityPage),
  makeSrElement('kvalitet vazduha', AirQualityPage),
];

export default db;
