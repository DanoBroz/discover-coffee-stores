import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";
import { CoffeeStore } from "../pages";

interface storeState {
    latLong: string;
    coffeeStores: CoffeeStore[];
}

interface DispatchAction {
    type: "SET_LAT_LONG" | "SET_COFFEE_STORES";
    payload: { latLong: string; coffeeStores: CoffeeStore[] };
}

export const StoreContext = createContext<{
    state: storeState;
    dispatch: Dispatch<DispatchAction>;
}>({
    state: {
        latLong: "",
        coffeeStores: [],
    },
    dispatch: () => null,
});

const storeReducer = (
    state: { latLong: string; coffeeStores: CoffeeStore[] },
    action: DispatchAction
) => {
    switch (action.type) {
        case "SET_LAT_LONG": {
            return { ...state, latLong: action.payload.latLong };
        }
        case "SET_COFFEE_STORES": {
            return { ...state, coffeeStores: action.payload.coffeeStores };
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const StoreProvider = ({ children }: PropsWithChildren) => {
    const initialState = {
        latLong: "",
        coffeeStores: [],
    };
    const [state, dispatch] = useReducer(storeReducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};
