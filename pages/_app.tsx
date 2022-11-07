import { AppShell, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import FooterLink from '../components/footerLink';
import Waves from '../components/waves';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Fête</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>


      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
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
              display: 'flex'
             },
          })}
        >
          <Waves />
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>

    </>
  )
}
