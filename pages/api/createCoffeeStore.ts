import { NextApiRequest, NextApiResponse } from "next";
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

console.log({ table });

const createCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ msg: "hello" });
};

export default createCoffeeStore;
