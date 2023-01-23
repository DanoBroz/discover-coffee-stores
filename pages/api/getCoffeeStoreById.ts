import { NextApiRequest, NextApiResponse } from "next";
import { getMinifiedRecords, table } from "../../lib/airtable";

const getCoffeeStoreById = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { id } = req.query;

    try {
        if (id) {
            const findCoffeeStoreRecords = await table
                .select({
                    filterByFormula: `id="${id}"`,
                })
                .firstPage();
            if (findCoffeeStoreRecords.length > 0) {
                const records = getMinifiedRecords(findCoffeeStoreRecords);

                res.json(records);
            } else {
                res.json({ msg: "No records found" });
            }
        } else {
            res.status(400).json({ msg: "Missing fields: Id" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error });
    }
};

export default getCoffeeStoreById;
