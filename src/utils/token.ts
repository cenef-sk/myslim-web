export function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

export function valid(token) {
  const dToken = parseJwt(token);
  var isExpiredToken = false;
  var dateNow = new Date();
  if(dToken.exp < dateNow.getTime()/1000)
  {
         isExpiredToken = true;
  }
  return !isExpiredToken;
}
