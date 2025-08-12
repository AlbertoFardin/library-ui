export const isStorybook = (): boolean => {
  const searchParams = new URLSearchParams(window.location.search);
  const path = searchParams.get("path");
  // Controlla se il valore di 'path' inizia con '/story/'
  return path?.startsWith("/story/");
};
