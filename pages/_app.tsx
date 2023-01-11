import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IBM_Plex_Sans } from "@next/font/google";
import React, {
    createContext,
    Dispatch,
    PropsWithChildren,
    useReducer,
} from "react";
import { CoffeeStore } from ".";

const ibmPlexSans = IBM_Plex_Sans({
    weight: ["400", "600", "700"],
    subsets: ["latin"],
});

interface storeState {
    latLong: string;
    coffeeStores: CoffeeStore[];
}

interface DispatchAction {
    type: "SET_LAT_LONG" | "SET_COFFEE_STORES";
    payload: { latLong: string; coffeeStores: [] };
}

const StoreContext = createContext<{
    state: storeState;
    dispatch: Dispatch<DispatchAction>;
}>({
    state: {
        latLong: "",
        coffeeStores: [],
    },
    dispatch: () => null,
});

export const ACTION_TYPES = {
    SET_LAT_LONG: "SET_LAT_LONG",
    SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (
    state: { latLong: string; coffeeStores: [] },
    action: {
        type: "SET_LAT_LONG" | "SET_COFFEE_STORES";
        payload: { latLong: string; coffeeStores: [] };
    }
) => {
    switch (action.type) {
        case ACTION_TYPES.SET_LAT_LONG: {
            return { ...state, latLong: action.payload.latLong };
        }
        case ACTION_TYPES.SET_COFFEE_STORES: {
            return { ...state, coffeeStores: action.payload.coffeeStores };
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const StoreProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(storeReducer, {
        latLong: "",
        coffeeStores: [],
    });

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

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
