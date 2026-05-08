export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function minLength(value: string, length: number): boolean {
  return value.trim().length >= length
}