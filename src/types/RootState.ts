import { GithubRepoFormState } from 'app/pages/SettingsPage/Features/GithubRepoForm/slice/types';
import { WISHLIST_SCOPE } from 'app/pages/WishlistPage/constants';
import { WishlistsState } from 'app/pages/WishlistPage/types';
import { ThemeState } from 'styles/theme/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;
  githubRepoForm?: GithubRepoFormState;
  [WISHLIST_SCOPE]: WishlistsState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
