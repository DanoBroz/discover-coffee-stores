import { CoffeeStore } from "../pages";

import { createApi } from "unsplash-js";

const unsplash = createApi({
    accessKey: String(process.env.UNSPLASH_API_KEY),
});

const getUrlForCoffeeStores = (
    latLong: string,
    query: string,
    limit: string
) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async (): Promise<CoffeeStore[]> => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: String(process.env.FOURSQUARE_API_KEY),
        },
    };

    const response = await fetch(
        getUrlForCoffeeStores("49.828932%2C18.170823", "coffee", "6"),
        options
    );
    const coffeeStoresData = await response.json();

    return coffeeStoresData.results;
};
