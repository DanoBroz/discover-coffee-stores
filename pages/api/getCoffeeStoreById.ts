import { NextApiRequest, NextApiResponse } from "next";

const getCoffeeStoreById = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { id } = req.query;

    try {
        if (id) {
            console.log(id);
            res.status(200).json({ id });
        } else {
            res.status(400).json({ msg: "Missing fields: Id" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error });
    }
};

export default getCoffeeStoreById;
