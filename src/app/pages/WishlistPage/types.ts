export interface Wishlist {
  url: string;
  title: string;
  image: string;
  description: string;
  createdAt?: Number;
  modifiedAt?: Number;
  _id?: string;
}

/* --- STATE --- */
export interface WishlistsState {
  loading: boolean | null;
  error?: RepoError | null;
  wishlists: Wishlist[];
  otherUserWishlist: Wishlist[];
  tempWish: any;
}

export interface RepoError {
  errorCount: number;
  message: string;
}

export interface WishProps extends Wishlist {
  onRemoveWish?: (id?: string) => void;
}

export interface UserInfoWishlistParams {
  userId: string;
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = WishlistsState;
