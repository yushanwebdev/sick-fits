/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components';
import NProgress from 'nprogress';
import Header from '../components/Header';
import GlobalStyle from '../components/styles/GlobalStyles';
import { useApollo } from '../lib/apolloClient';

import '../components/styles/nprogress.css';

const theme: DefaultTheme = {
  colors: {
    red: '#ff0000',
    black: '#393939',
    grey: '#3a3a3a',
    get gray() {
      return (this as DefaultTheme['colors']).grey;
    },
    lightGrey: '#e1e1e1',
    get lightGray() {
      return (this as DefaultTheme['colors']).lightGrey;
    },
    offWhite: '#ededed',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  },
};

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <InnerStyles>
          <Component {...pageProps} />
        </InnerStyles>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
