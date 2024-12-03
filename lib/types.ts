export interface AddressInput {
  postcode: string
  suburb: string
  state: string
}

export interface ValidationResult {
  isValid: boolean
  message: string
}

