export const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email).toLowerCase())) return undefined;
  else return 'Invalid email address';
}

export const validatePassword = (password: string) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]?)[A-Za-z\d@$!%*#?&]{8,}$/i
  if (password.length < 8) return 'Password must be at least 8 characters long';
  else if (password.length > 32) return 'Password must be less than 32 characters long';
  else if (!re.test(password)) return 'Password must contain at least one letter, one number and one special character';
  else return undefined;
}

export const validateName = (name: string) => {
  if (name.length < 3) return "Username must be atleast 3 characters long"
  else return undefined
}

export const validateText = (text: string) => {
  if (text.trim().length === 0) return "This field is required"
  else return undefined
}

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) return "Passwords do not match"
  else return undefined
}