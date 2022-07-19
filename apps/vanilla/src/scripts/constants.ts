/** Type of token. */
export enum Token {
  Refresh = 'REFRESH_TOKEN',
  Access = 'ACCESS_TOKEN',
}

/** Available url. */
export enum Url {
  Home = '/',
  Login = '/login/',
  Register = '/register/',
  Detail = '/detail/',
  Profile = '/profile/',
}

/** Local storage key for pagination data. */
export enum PaginationLocalStorage {
  active = 'ACTIVE',
  search = 'SEARCH',
  type = 'TYPE',
  sort = 'SORT',
}
