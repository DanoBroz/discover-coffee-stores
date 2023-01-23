import { NextApiRequest, NextApiResponse } from "next";
import {
    findRecordByFilter,
    getMinifiedRecords,
    table,
} from "../../lib/airtable";

const upvoteCoffeeStoreById = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method === "PUT") {
        try {
            const { id } = req.query;
            const { voting } = req.body;

            if (id) {
                const records = await findRecordByFilter(id);

                if (records.length !== 0) {
                    const record = records[0];
                    const updatedRecord = await table.update([
                        {
                            id: record.id,
                            fields: {
                                voting: record.voting + 1,
                            },
                        },
                    ]);

                    res.status(200).json(updatedRecord);
                } else {
                    res.status(400).json({ message: `id could not be found` });
                }
            } else {
                res.status(400);
                res.json({ message: "Id is missing" });
            }
        } catch (error) {
            res.status(500);
            res.json({ message: "Error upvoting coffee store", error });
        }
    }
};

export default upvoteCoffeeStoreById;
