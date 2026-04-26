// Input validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateUrl = (url: string): boolean => {
  if (!url) return true // Empty is ok, means optional
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validatePhone = (phone: string): boolean => {
  if (!phone) return true // Empty is ok
  // Basic check: contains at least 10 digits
  const digitsOnly = phone.replace(/\D/g, '')
  return digitsOnly.length >= 10
}

export const sanitizeInput = (input: string): string => {
  // Remove dangerous characters but keep normal text
  return input.replace(/[<>]/g, '')
}
