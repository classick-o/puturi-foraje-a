// Helper unic pentru link-uri interne, ca sa respecte automat `base` din
// astro.config.mjs (vezi stack-ui.md - hosting GitHub Pages).
// Cand stergi `base`, BASE_URL devine "/" si nimic nu trebuie modificat.
const BASE = import.meta.env.BASE_URL;

export function withBase(path: string = ''): string {
  return (BASE + String(path).replace(/^\//, '')).replace(/\/{2,}/g, '/');
}
