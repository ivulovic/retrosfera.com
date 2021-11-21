/**
 * WEBSITE INFO
 *
 * @docs FrontEnd // Settings // Website info
 * @desc website - Configurable website information in one place
 *
 * @data {string} websiteName - Name of our website
 * @data {string} websiteShortName - Short name of our website
 * @data {string} websiteContactEmail - Contact Email
 * @data {string} websiteSupportEmail - Support Email
 * @data {Date} copyrightLastYear - Value of present Year
 */
export const websiteName = 'Spisko';
export const websiteLogoText = 'spisko';
export const websiteMetaDescription = 'Vaš lični spisak - Vaša lista želja';
export const websiteMetaTitleWishlistPage = 'Lista želja';
export const websiteMetaDescriptionWishlistPage =
  'Lista želja. Dodajte svoju želju i podelite sa svojim prijateljima.';
export const websiteMetaTitleStoresPage = 'Prodavnice';
export const websiteMetaDescriptionStoresPage =
  'Prodavnice. Lista prodavnica koje su podržane.';

export const websiteMetaTitleLoginPage = 'Prijavite se';
export const websiteMetaDescriptionLoginPage =
  'Ulogujte se. Pristupite Vašoj ličnoj listi i spisku želja.';

export const websiteMetaTitleRegisterPage = 'Napravite nalog';
export const websiteMetaDescriptionRegisterPage =
  'Registracija. Napravite nalog i pristupite brzo i jednostavno Vašoj listi i spisku želja.';

export const websiteMetaTitleLandingPage = 'Početna';
export const websiteMetaDescriptionLandingPage =
  'Vaš lični spisak - Vaša lista želja';

export const websiteMetaTitleSettingsPage = 'Podešavanja';
export const websiteMetaDescriptionSettingsPage = `Podešavanja ${websiteName} web aplikacije`;

export const websiteShortName = 'spisko';
export const websiteContactEmail = 'info@spisko.com';
export const websiteSupportEmail = 'support@spisko.com';
export const copyrightLastYear = new Date().getFullYear();

/**
 * COOKIE
 *
 * @docs FrontEnd // Settings // Cookie
 * @desc cookie - This is object that is used to represent `cookie` settings
 *
 * @data {string} name - Cookie name
 * @data {number} expires - Represents number of `minutes` in future when cookie is going to disappear
 * @data {number} refresh - Represents number of `seconds` after which the existing cookie will be `updated`
 */
export const cookie = {
  name: 'Authorization',
  expirationName: 'exp-token',
  expires: 480, // 8h
  refresh: 600, // 600s => 10min
};

/**
 * Auth
 *
 * @docs FrontEnd // Settings // Auth
 * @desc auth - Default auth configurations on website
 *
 * @data {string} defaultRedirectRouteForPrivateRouter - Path where user is going to be redirected in case that Route criteria isn't satisfied
 * @data {string} defaultRedirectRouteForOnlyPublicRouter - Path where user is going to be redirected in case that Route criteria isn't satisfied
 */
export const defaultRedirectRouteForPrivateRouter = '/'; //sign-in
export const defaultRedirectRouteForOnlyPublicRouter = '/';

// notification lasting
export const defaultNotificationDuration = 1000;
