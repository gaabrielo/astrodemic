import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Rubik } from 'next/font/google';

import '../components/ui/shared/sortable-list/components/SortableItem/SortableItem.css';

const rubik = Rubik({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <RecoilRoot>
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
      `}</style>
      {getLayout(<Component {...pageProps} />)}
    </RecoilRoot>
  );
}
