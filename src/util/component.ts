export function buildClassName(names: string[]) {
  return names.filter(x => !!x).join(' ');
}
