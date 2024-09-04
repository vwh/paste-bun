export function makeCookie(deleteToken: string) {
  return `deleteToken=${encodeURIComponent(
    deleteToken
  )}; HttpOnly; Path=/; Max-Age=3600`;
}

export const emptyCookie = `deleteToken=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
