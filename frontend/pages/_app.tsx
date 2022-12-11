import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import type { AppProps } from 'next/app';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components';
import Header from '../components/Header';
import GlobalStyle from '../components/styles/globalstyles';
import withData from '../lib/withData';

type AppOwnProps = { apollo: ApolloClient<NormalizedCacheObject> };

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

const MyApp = ({ Component, pageProps, apollo }: AppProps & AppOwnProps) => (
  <ApolloProvider client={apollo}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <InnerStyles>
        <Component {...pageProps} />
      </InnerStyles>
    </ThemeProvider>
  </ApolloProvider>
);

export default withData(MyApp);
