import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Rubik } from 'next/font/google';

import '../components/ui/sortable-list/components/SortableItem/SortableItem.css';

const rubik = Rubik({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
