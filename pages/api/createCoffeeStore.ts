import { NextApiRequest, NextApiResponse } from "next";
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

const createCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
    const findCoffeeStoreRecords = await table
        .select({
            filterByFormula: `id="2"`,
        })
        .firstPage();

    console.log({ findCoffeeStoreRecords });

    if (req.method === "POST") {
        try {
            if (findCoffeeStoreRecords.length > 0) {
                const records = findCoffeeStoreRecords.map(
                    (record: { fields: any[] }) => ({ ...record.fields })
                );
                res.json(records);
            } else {
                const createRecords = await table.create([
                    {
                        fields: {
                            id: "2",
                            name: "Starbucks",
                            address: "123 Main St",
                            neighborhood: "Downtown",
                            voting: 200,
                            imgUrl: "https://picsum.photos/200",
                        },
                    },
                ]);

                const records = createRecords.map(
                    (record: { fields: any[] }) => ({ ...record.fields })
                );

                res.json(records);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Something went wrong" });
        }
    }

    // res.status(200).json({ msg: "hello" });
};

export default createCoffeeStore;
