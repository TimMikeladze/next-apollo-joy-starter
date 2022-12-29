import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import merge from 'deepmerge';
import { IncomingHttpHeaders } from 'http';
import fetch from 'unfetch';
import isEqual from 'lodash/isEqual';
import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import getAppUrl from '@/util/getAppUrl';
import { DEFAULT_DEBOUNCE_RATE } from '@/util/constants';
import DebounceLink from 'apollo-link-debounce';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import toast from 'react-hot-toast';

const APOLLO_STATE_PROP_NAME = `__APOLLO_STATE__`;

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
  // isomorphic fetch for passing the cookies along with each GraphQL request
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(
      url as any,
      {
        ...init,
        headers: {
          ...init.headers,
          'Access-Control-Allow-Origin': `*`,
          // here we pass the cookie along for each request
          Cookie: headers?.cookie ?? ``,
        },
      } as any,
    ).then((response) => response);
  };

  const httpOptions = {
    credentials: `include`,

    fetch: enhancedFetch,
    // Make sure that CORS and cookies work
    fetchOptions: {
      mode: `cors`,
    },
    uri: getAppUrl(`/api/graphql`),
  };

  const link = ApolloLink.from([
    onError((error: any) => {
      if (error?.graphQLErrors)
        error.graphQLErrors.forEach((graphQLError: any) => {
          toast.error(graphQLError.message);
          // SnackbarUtils.error(graphQLError?.message);
          // eslint-disable-next-line no-console
          console.error(
            `[GraphQL error]: Message: ${graphQLError?.message}, Location: ${graphQLError?.locations}, Path: ${graphQLError?.path}`,
          );
        });
      if (error?.networkError)
        // eslint-disable-next-line no-console
        console.error(
          `[Network error]: ${error.networkError}. Backend is unreachable. Is it running?`,
        );
    }) as any,
    new DebounceLink(DEFAULT_DEBOUNCE_RATE),
  ]).split(
    (operation: any) =>
      operation.query.definitions.some(
        (definition: any) =>
          definition.kind === `OperationDefinition` &&
          definition.operation === `query`,
      ),
    new BatchHttpLink({
      ...httpOptions,
    } as any),
    new HttpLink({
      ...httpOptions,
    } as any),
  );

  return new ApolloClient({
    cache: new InMemoryCache({}),
    link,
    // SSR only for Node.js
    ssrMode: typeof window === `undefined`,
  });
};

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null;
  initialState?: InitialState | null;
}

export const initializeApollo = (
  { headers, initialState }: IInitializeApollo = {
    headers: null,
    initialState: null,
  },
) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === `undefined`) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps'],
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state],
  );
  return store;
}
