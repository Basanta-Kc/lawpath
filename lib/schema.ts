import { gql } from '@apollo/client';
import { z } from 'zod';

export const typeDefs = gql`
  type AddressValidationResult {
    isValid: Boolean!
    message: String!
  }

  type Query {
    validateAddress(postcode: String!, suburb: String!, state: String!): AddressValidationResult!
  }
`;

export const addressSchema = z.object({
  postcode: z.string().regex(/^\d{4}$/, { message: "Postcode must be a 4-digit number" }),
  suburb: z.string().min(2, { message: "Suburb must be at least 2 characters long" }),
  state: z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'], { 
    errorMap: () => ({ message: "Please select a valid state" })
  }),
});

export type AddressInput = z.infer<typeof addressSchema>;

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

