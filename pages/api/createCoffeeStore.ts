import { NextApiRequest, NextApiResponse } from "next";
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

const createCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
    const findCoffeeStoreRecords = await table
        .select({
            filterByFormula: `id="${req.body.id}"`,
        })
        .firstPage();

    console.log({ findCoffeeStoreRecords });

    if (req.method === "POST") {
        const { id, name, neighborhood, address, imgUrl, voting } = req.body;

        try {
            if (id) {
                if (findCoffeeStoreRecords.length > 0) {
                    const records = findCoffeeStoreRecords.map(
                        (record: { fields: any[] }) => ({ ...record.fields })
                    );
                    res.json(records);
                } else {
                    if (name) {
                        const createRecords = await table.create([
                            {
                                fields: {
                                    id,
                                    name,
                                    neighborhood,
                                    address,
                                    imgUrl,
                                    voting,
                                },
                            },
                        ]);

                        const records = createRecords.map(
                            (record: { fields: any[] }) => ({
                                ...record.fields,
                            })
                        );

                        res.json(records);
                    } else {
                        res.status(400).json({
                            msg: "Missing fields: Name",
                        });
                    }
                }
            } else {
                res.status(400).json({
                    msg: "Missing fields: Id",
                });
            }
        } catch (error) {
            console.error(
                "Something went wrong with finding or creating a store",
                error
            );
            res.status(500).json({
                msg: "Something went wrong with finding or creating a store",
            });
        }
    }

    // res.status(200).json({ msg: "hello" });
};

export default createCoffeeStore;
