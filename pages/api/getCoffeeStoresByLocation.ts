import { NextApiRequest, NextApiResponse } from "next";
import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCofeeStoresByLocation = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const { latLong, limit } = req.query;
        const coffeeStores = await fetchCoffeeStores(
            String(latLong),
            String(limit)
        );
        res.status(200).json(coffeeStores);
    } catch (err) {
        console.error("There was an error fetching coffee stores", err);
    }
};

export default getCofeeStoresByLocation;
