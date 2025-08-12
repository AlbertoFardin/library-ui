const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  return !!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
};

export default isValidEmail;
