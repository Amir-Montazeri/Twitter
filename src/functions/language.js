export const isPersian = text => {
  const persian = /[\u0600-\u06FF]/;
  return persian.test(text);
};