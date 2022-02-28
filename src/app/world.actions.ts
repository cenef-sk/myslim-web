export const APP_HEADER_CHANGE = '[App] Change Application Header';
export const LOGIN_USER = '[App] User Login';
export const LOGOUT_USER = '[App] User Logout';

export class ChangeHeader {
  type = APP_HEADER_CHANGE;
  constructor(public payload: {title: String}) {}
}
export class LoginUser {
  type = LOGIN_USER;
  constructor(public payload) {}
}
export class LogoutUser {
  type = LOGOUT_USER;
  constructor(public payload) {}
}

export type NavigationAction =
  | ChangeHeader
  | LoginUser
  | LogoutUser;
