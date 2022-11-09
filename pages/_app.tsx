import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { getCookie, setCookie } from 'cookies-next';
import type { AppContext, AppProps } from 'next/app';
import NextApp from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import FooterLink from '../components/footerLink';
import Waves from '../components/waves';
import '../styles/globals.css';
export default function App({ Component, pageProps, ...props }: AppProps & { colorScheme: ColorScheme }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Souhaitez la fête de vos proches</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.png" />
        <meta name="author" content="Louis Chovaneck" />
        <meta name="robots" content="follow" />
        <meta name="theme-color" content="#18534F" />

        <meta property="og:title" content="Souhaitez la fête de vos proches" />
        <meta property="og:site_name" content="Souhaitez la fête de vos proches" />
        <meta property="og:url" content="https://next-fete.vercel.app/" />
        <meta property="og:description" content="N'oubliez plus la fête de vos proches !" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="og.img" />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            colors: {
              'emeraude': [
                '#e1fcfa',
                '#c0efec',
                '#9ce2de',
                '#78d7d0',
                '#54cbc3',
                '#3cb1a9',
                '#2c8a84',
                '#1d635e',
                '#0a3b38',
                '#001614',
              ],
              'emeraude-light': [
                '#e2fcfa',
                '#c1eeeb',
                '#9ee1dc',
                '#79d5ce',
                '#57c7c0',
                '#3faea7',
                '#2e8882',
                '#1e615d',
                '#0b3a38',
                '#001515',
              ],
              'sand': [
                '#fff9e0',
                '#feeeb3',
                '#fee384',
                '#fcd853',
                '#fccc29',
                '#e2b317',
                '#b08b0f',
                '#7e6307',
                '#4c3c01',
                '#1a1400',
              ],
              'camel': [
                '#fff0e1',
                '#f4d6bd',
                '#e7bd97',
                '#dca36f',
                '#d18847',
                '#b86f2e',
                '#905623',
                '#673e17',
                '#3f240a',
                '#1b0a00',
              ]
            }
          }}
        >
          <AppShell
            footer={
              <FooterLink />
            }
            styles={(theme) => ({
              main: {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#ECF8F6',
                display: 'flex',
                paddingTop: '3%'
              },
            })}
          >
            <Waves />
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>

    </>
  )
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'light',
  };
};
