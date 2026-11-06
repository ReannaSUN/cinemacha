/** Vite string URL or Next StaticImageData */
export function assetUrl(mod: string | { src: string }): string {
  return typeof mod === 'string' ? mod : mod.src
}
