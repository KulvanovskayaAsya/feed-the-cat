type Validator = (value: string) => string | null

type ValidatorMap = {
  [key: string]: Validator
}

const validateName = (name: string): string | null => {
  const regex = /^[А-ЯA-Z][а-яa-z-]*$/
  if (!regex.test(name)) {
    return 'Name must start with a capital letter, contain only Latin or Cyrillic letters, and may include a hyphen.'
  }
  return null
}

const validateLogin = (login: string): string | null => {
  const regex = /^(?!\d+$)[a-zA-Z0-9-_]{3,20}$/
  if (!regex.test(login)) {
    return 'Login must be 3-20 characters long, contain only Latin letters, numbers, hyphens, and underscores, and cannot consist solely of numbers.'
  }
  return null
}

const validatePassword = (password: string): string | null => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/
  if (!regex.test(password)) {
    return 'Password must be 8-40 characters long and include at least one uppercase letter and one number.'
  }
  return null
}

const validatePhone = (phone: string): string | null => {
  const regex = /^(\+)?\d{10,15}$/
  if (!regex.test(phone)) {
    return 'Phone must be 10-15 characters long and contain only digits, possibly starting with a plus.'
  }
  return null
}

const validateNotEmpty = (value: string): string | null => {
  if (value.trim() === '') {
    return 'Field cannot be empty.'
  }
  return null
}

const validateUserId = (id: string): string | null => {
  const regex = /^\d{1,7}$/
  if (!regex.test(id)) {
    return 'User ID must be a whole number.'
  }
  return null
}

const validators: ValidatorMap = {
  first_name: validateName,
  second_name: validateName,
  login: validateLogin,
  password: validatePassword,
  phone: validatePhone,
  message: validateNotEmpty,
  chatTitle: validateNotEmpty,
  chatUser: validateUserId,
}

export const validate = (fieldName: string, value: string): string | null => {
  const validator = validators[fieldName]
  if (!validator) {
    return null
  }
  return validator(value)
}
