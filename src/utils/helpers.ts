export const isObjEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export const getPasswordStrength = (password: string): string => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()]/.test(password);
  const isOver10CharsLong = password.length > 10;

  if (
    hasUppercase &&
    hasLowercase &&
    hasDigit &&
    hasSpecialChar &&
    isOver10CharsLong
  ) {
    return "Hard";
  } else if (hasUppercase && hasLowercase && hasSpecialChar) {
    return "Medium";
  } else {
    return "Easy";
  }
};
