import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'src/util/createEmotionCache';
import { createTheme, useMediaQuery } from '@mui/material';
import 'src/styles/styles.scss';
// fullcalendar css
import Layout from 'src/components/layout/Layout';
import { useRouter } from 'next/router';
import { askPermission, makeRequest } from 'src/util/helpers';
import { apiUrl } from 'src/util/env';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const router = useRouter();

  /*   useEffect(() => {
      if (!window.localStorage.getItem('token')) {
        router.push('/login');
      }
    }, []) */

  useEffect(() => {
    navigator.serviceWorker.register('/worker.js')
      .then(registration => {
        askPermission().then(() => {
          const options = {
            userVisibleOnly: true,
            applicationServerKey: 'BCP4ZdjJL9H8VKGWbjsAPmZEvh9fIkaQGYZxfchjS-WRPCKTRyKGPY0WVcr4OcoAKbzOhSFbfqZDNpeOMIPqDKI',
          }
          return registration.pushManager.subscribe(options);
        }).then(pushSubscription => {
          makeRequest(`${apiUrl}/v1/messages/subscribe`, 'POST', pushSubscription)
            .then(res => console.log(res));
        })
      })
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>TimeLess</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {
          router.asPath.includes('cadastro') || router.asPath.includes('login') ?
            <Component {...pageProps} /> :
            (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )
        }
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
