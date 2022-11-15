import { ReactNode, StrictMode, Suspense } from "react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import "../styles/globals.css";

const DynamicHeader = dynamic(
  () => import("../components/page/HeaderContent"),
  { suspense: true }
);
const DynamicNav = dynamic(() => import("../components/page/NavMenu"), {
  suspense: true,
});
const DynamicScroll = dynamic(() => import("../components/page/ScrollUp"), {
  suspense: true,
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <StrictMode>
      <SessionProvider session={session}>
        <Suspense fallback={<></>}>
          <Layout>
            <Header>
              <DynamicNav />
              <DynamicHeader />
            </Header>
            <Page>
              <DynamicScroll />
              <Component {...pageProps} />
            </Page>
          </Layout>
        </Suspense>
      </SessionProvider>
    </StrictMode>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return <div className="Layout">{children}</div>;
}

function Header({ children }: { children: ReactNode }) {
  return <div className="Header">{children}</div>;
}

function Page({ children }: { children: ReactNode }) {
  return <div className="Page">{children}</div>;
}
