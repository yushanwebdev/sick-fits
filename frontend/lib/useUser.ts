/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query GetAuthUser {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export const useUser = () => {
  const { data, error } = useQuery(CURRENT_USER_QUERY);

  console.log('error', error);

  return data?.authenticatedItem;
};
