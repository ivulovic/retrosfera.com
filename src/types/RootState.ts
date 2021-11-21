import { WISHLIST_SCOPE } from 'app/pages/WishlistPage/constants';
import { WishlistsState } from 'app/pages/WishlistPage/types';
import { THEME_SCOPE } from 'styles/theme/slice/constants';
import { ThemeState } from 'styles/theme/slice/types';

export interface RootState {
  [THEME_SCOPE]: ThemeState;
  [WISHLIST_SCOPE]: WishlistsState;
}
