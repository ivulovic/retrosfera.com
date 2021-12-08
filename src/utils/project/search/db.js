// const CovidPage = {
//   path: 'kovid-analitika',
// };

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
  // makeElement('korona', CovidPage),
  // makeElement('koronavirus', CovidPage),
  // makeElement('korona virus', CovidPage),
  // makeElement('corona', CovidPage),
  // makeElement('coronavirus', CovidPage),
  // makeElement('corona virus', CovidPage),
  // makeElement('virus korona', CovidPage),
  // makeElement('covid', CovidPage),
  // makeElement('covid19', CovidPage),
  // makeElement('kovid', CovidPage),

  makeEnElement('apps', ApplicationsPage),
  makeEnElement('applications', ApplicationsPage),
  makeEnElement('wishlist', ApplicationsPage),
  makeEnElement('cryptoexchange', ApplicationsPage),

  //
  // makeElement('корона', CovidPage),
  // makeElement('коронавирус', CovidPage),
  // makeElement('корона вирус', CovidPage),
  // makeElement('вирус корона', CovidPage),
  // makeElement('ковид', CovidPage),
  // makeElement('ковид19', CovidPage),

  makeSrElement('апликација', ApplicationsPage),
  makeSrElement('апликације', ApplicationsPage),
  makeSrElement('листа жеља', ApplicationsPage),
  makeSrElement('криптоберза', ApplicationsPage),
];

export default db;
