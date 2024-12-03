import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs, addressSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const resolvers = {
  Query: {
    validateAddress: jest.fn(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

describe('GraphQL API', () => {
  it('should validate a correct address', async () => {
    const mockResponse = {
      data: {
        localities: {
          locality: [
            {
              postcode: '2000',
              location: 'SYDNEY',
            },
          ],
        },
      },
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    resolvers.Query.validateAddress.mockResolvedValueOnce({
      isValid: true,
      message: 'The postcode, suburb, and state input are valid.',
    });

    const req = new NextRequest('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query ValidateAddress($postcode: String!, $suburb: String!, $state: String!) {
            validateAddress(postcode: $postcode, suburb: $suburb, state: $state) {
              isValid
              message
            }
          }
        `,
        variables: {
          postcode: '2000',
          suburb: 'Sydney',
          state: 'NSW',
        },
      }),
    });

    const response = await handler(req);
    const result = await response.json();

    expect(result.data.validateAddress.isValid).toBe(true);
    expect(result.data.validateAddress.message).toBe('The postcode, suburb, and state input are valid.');
  });
});

