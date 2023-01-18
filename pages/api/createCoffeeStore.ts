import { NextApiRequest, NextApiResponse } from "next";
import { table, getMinifiedRecords } from "../../lib/airtable";

const createCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
    const findCoffeeStoreRecords = await table
        .select({
            filterByFormula: `id="${req.body.id}"`,
        })
        .firstPage();

    if (req.method === "POST") {
        const { id, name, neighborhood, address, imgUrl, voting } = req.body;

        try {
            if (id) {
                if (findCoffeeStoreRecords.length > 0) {
                    const records = getMinifiedRecords(findCoffeeStoreRecords);

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

                        const records = getMinifiedRecords(createRecords);

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
