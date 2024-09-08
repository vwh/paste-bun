export function makeOwnerCookie(ownerId: string) {
  return `ownerId=${encodeURIComponent(ownerId)}; HttpOnly; Path=/`;
}
