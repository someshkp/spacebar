function validateAuth(data, register = true) {
  const errors = {};
  if (!data || typeof data !== 'object' || Array.isArray(data)) return { form: 'Provide valid account details.' };
  if (register) {
    if (!['creator', 'business'].includes(data.accountType)) errors.accountType = 'Choose Creator or Brand.';
    const label = data.accountType === 'business' ? 'Organization name' : 'Full name';
    if (typeof data.name !== 'string' || data.name.trim().length < 2 || data.name.trim().length > 120 || /[\u0000-\u001f\u007f]/u.test(data.name) || !/[\p{L}\p{N}]/u.test(data.name)) errors.name = label + ' must be 2–120 characters and contain a letter or number.';
  }
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  if (email.length > 254 || email.split('@')[0].length > 64 || !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email)) errors.email = 'Enter a valid email address (up to 254 characters).';
  if (typeof data.password !== 'string' || !data.password.length) errors.password = 'Enter your password.';
  else if (register && (data.password.length < 8 || data.password.length > 128 || !data.password.trim())) errors.password = 'Use 8–128 characters; your password cannot be only spaces.';
  if (register && (typeof data.confirmPassword !== 'string' || !data.confirmPassword.length)) errors.confirmPassword = 'Confirm your password.';
  else if (register && data.confirmPassword !== data.password) errors.confirmPassword = 'Passwords do not match.';
  if (register && data.profile !== undefined && (!data.profile || typeof data.profile !== 'object' || Array.isArray(data.profile))) errors.profile = 'Provide a valid profile object.';
  return errors;
}

export { validateAuth };
