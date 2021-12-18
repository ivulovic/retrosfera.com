import { AIR_QUALITY_SCOPE } from 'app/pages/AirQualityPage/constants';
import { AirQualityState } from 'app/pages/AirQualityPage/types';
import { CRYPTOEXCHANGE_SCOPE } from 'app/pages/CryptoExchangePage/constants';
import { CryptoexchangeState } from 'app/pages/CryptoExchangePage/types';
import { WISHLIST_SCOPE } from 'app/pages/WishlistPage/constants';
import { WishlistsState } from 'app/pages/WishlistPage/types';
import { THEME_SCOPE } from 'styles/theme/slice/constants';
import { ThemeState } from 'styles/theme/slice/types';

export interface RootState {
  [THEME_SCOPE]: ThemeState;
  [WISHLIST_SCOPE]: WishlistsState;
  [CRYPTOEXCHANGE_SCOPE]: CryptoexchangeState;
  [AIR_QUALITY_SCOPE]: AirQualityState;
}
