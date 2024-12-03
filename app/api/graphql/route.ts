import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import {
  typeDefs,
  addressSchema,
  AddressInput,
  ValidationResult,
} from "@/lib/schema";
import { z } from "zod";
import axios, { AxiosError } from "axios";

const resolvers = {
  Query: {
    validateAddress: async (
      _: unknown,
      input: AddressInput
    ): Promise<ValidationResult> => {
      try {
        // Validate input using Zod
        const validatedInput = addressSchema.parse(input);
        const { postcode, suburb, state } = validatedInput;

        const response = await axios.get(
          `https://digitalapi.auspost.com.au/postcode/search.json?q=${encodeURIComponent(
            suburb
          )}&state=${state}`,
          {
            headers: {
              "Auth-Key": process.env.AUSTRALIA_POST_API_KEY,
            },
          }
        );

        const data = response.data;
        const localities = data.localities?.locality;

        if (Array.isArray(localities)) {
          const matchingLocality = localities.find(
            (loc: { postcode: string; location: string }) =>
              loc.postcode == postcode &&
              loc.location.toLowerCase() === suburb.toLowerCase()
          );
          if (matchingLocality) {
            return {
              isValid: true,
              message: "The postcode, suburb, and state input are valid.",
            };
          } else {
            return {
              isValid: false,
              message: `The postcode ${postcode} does not match the suburb ${suburb} in ${state}.`,
            };
          }
        } else if (localities) {
          if (localities.postcode === postcode) {
            return {
              isValid: true,
              message: "The postcode, suburb, and state input are valid.",
            };
          } else {
            return {
              isValid: false,
              message: `The postcode ${postcode} does not match the suburb ${suburb} in ${state}.`,
            };
          }
        } else {
          return {
            isValid: false,
            message: `The suburb ${suburb} does not exist in the state ${state}.`,
          };
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          return { isValid: false, message: error.errors[0].message };
        }
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 429) {
            return {
              isValid: false,
              message: "Too many requests. Please try again later.",
            };
          }
          if (axiosError.response?.status === 403) {
            return {
              isValid: false,
              message: "Access denied. Please check your API key.",
            };
          }
        }
        console.error("Error validating address:", error);
        return {
          isValid: false,
          message: "An error occurred while validating the address.",
        };
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
