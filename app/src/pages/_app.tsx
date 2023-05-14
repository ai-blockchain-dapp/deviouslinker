import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { init } from "@airstack/airstack-react";
console.log(`${process.env.AIRSTACK_API_KEY}`);
init(`${process.env.AIRSTACK_API_KEY}`);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
