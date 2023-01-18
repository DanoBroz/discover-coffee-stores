const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_KEY
);

export const table = base("coffee-stores");

const getMinifiedRecord = (record: any) => ({
    ...record.fields,
});

export const getMinifiedRecords = async (records: any) => {
    return records.map((record: any) => getMinifiedRecord(record));
};
