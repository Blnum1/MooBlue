const BASE_URL = 'http://localhost:5000';

export const PORKS_URL = BASE_URL + '/api/porks';
export const PORKS_TAGS_URL = PORKS_URL + '/tags';
export const PORKS_BY_SEARCH_URL = PORKS_URL + '/search/';
export const PORKS_BY_TAG_URL = PORKS_URL + '/tag/';
export const PORK_BY_ID_URL = PORKS_URL + '/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';