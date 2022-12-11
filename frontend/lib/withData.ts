import {
  ApolloClient,
  InMemoryCache,
  from,
  NormalizedCacheObject,
  HttpOptions,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { endpoint, prodEndpoint } from '../config';

function createClient({
  headers,
  initialState,
}: {
  headers: HttpOptions['headers'];
  initialState: NormalizedCacheObject;
}) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations
          )}, Path: ${JSON.stringify(path)}`
        )
      );

    if (networkError)
      console.log(`[Network error]: ${JSON.stringify(networkError)}`);
  });

  // this uses apollo-link-http under the hood, so all the options here come from that package
  const uploadLink = createUploadLink({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    credentials: 'include',
    // pass the headers along from this request. This enables SSR with logged in state
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers,
  });

  // If you provide a link chain to ApolloClient, you
  // don't provide the `uri` option.
  return new ApolloClient({
    // The `from` function combines an array of individual links
    // into a link chain
    link: from([errorLink, uploadLink]),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default withApollo(createClient, { getDataFromTree });
