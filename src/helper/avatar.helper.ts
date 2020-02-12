export function generateAvatar(avatarFileName: string): string {
  if (avatarFileName === null || avatarFileName === undefined) {
    return '';
  }
  return avatarFileName ? `/api/image/${avatarFileName}` : '/assets/imgs/logo.png';
}
