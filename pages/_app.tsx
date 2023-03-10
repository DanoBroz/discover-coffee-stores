import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IBM_Plex_Sans } from "@next/font/google";
import React from "react";
import { StoreProvider } from "../store/store-context";

const ibmPlexSans = IBM_Plex_Sans({
    weight: ["400", "600", "700"],
    subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={ibmPlexSans.className}>
            <StoreProvider>
                <Component {...pageProps} />
            </StoreProvider>
            {/* <footer>Hello there</footer> */}
        </div>
    );
}
