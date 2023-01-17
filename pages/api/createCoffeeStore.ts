import { NextApiRequest, NextApiResponse } from "next";
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

const createCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
    const findCoffeeStoreRecords = await table
        .select({
            filterByFormula: `id="0"`,
        })
        .firstPage();

    console.log({ findCoffeeStoreRecords });

    if (req.method === "POST") {
        if (findCoffeeStoreRecords.length > 0) {
            // const re
            // findCoffeeStoreRecords.map(record => )
            res.json(findCoffeeStoreRecords);
        } else {
            res.json({ msg: "no records found" });
        }
    }

    // res.status(200).json({ msg: "hello" });
};

export default createCoffeeStore;
