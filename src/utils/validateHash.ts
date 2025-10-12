// List of valid hash fragments that should be allowed
const validHashes = [
  'services',
  'portfolio',
  'about',
  'team',
  'testimonials',
  'faq',
  'contact'
];

/**
 * Checks if a hash fragment is valid
 * @param hash The hash fragment to check (without the #)
 * @returns boolean indicating if the hash is valid
 */
export const isValidHash = (hash: string): boolean => {
  if (!hash) return true; // No hash is considered valid (will go to top of page)
  return validHashes.includes(hash.toLowerCase());
};
