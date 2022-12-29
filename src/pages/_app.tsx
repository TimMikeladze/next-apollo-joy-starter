import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import AppBase from '@/components/AppBase';
import { useApollo } from '@/graphql/apollo';
import { ApolloProvider } from '@apollo/client';
import AppPage from '@/components/AppPage';
import { DefaultSeo } from 'next-seo';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const apollo = useApollo({
    session,
    ...pageProps,
  });

  const { t } = useTranslation();

  return (
    <>
      <DefaultSeo title={t(`appName`)} description={t(`slogan`)} />
      <ApolloProvider client={apollo}>
        <SessionProvider session={session}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <AppBase>
            <AppPage>
              <Component {...pageProps} />
            </AppPage>
          </AppBase>
        </SessionProvider>
      </ApolloProvider>
    </>
  );
};

export default appWithTranslation(MyApp);

export { reportWebVitals } from 'next-axiom';
