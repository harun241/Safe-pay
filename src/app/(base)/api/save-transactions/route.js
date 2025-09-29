import fs from "fs";
import path from "path";

// Convert single object to CSV row
function convertToCsvRow(obj, fields) {
  return fields
    .map((field) => {
      let val = obj[field];
      if (val === null || val === undefined) val = "";
      if (typeof val === "string" && val.includes(",")) val = `"${val}"`;
      return val;
    })
    .join(",");
}

export async function POST(req) {
  try {
    const transactions = await req.json(); // Expect array with 1 transaction
    if (!transactions || transactions.length === 0) {
      return new Response(JSON.stringify({ error: "No transaction provided" }), { status: 400 });
    }

    // Take only the **latest** transaction
    const latestTransaction = transactions[transactions.length - 1];

    // Ensure /data folder exists
    const dirPath = path.join(process.cwd(), "data");
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    const filePath = path.join(dirPath, "transactions.csv");
    const fields = Object.keys(latestTransaction);

    // Add header if file doesn't exist
    if (!fs.existsSync(filePath)) {
      const header = fields.join(",") + "\n";
      fs.writeFileSync(filePath, header, "utf8");
    }

    // Append the latest transaction as CSV row
    const row = convertToCsvRow(latestTransaction, fields) + "\n";
    fs.appendFileSync(filePath, row, "utf8");

    return new Response(JSON.stringify({ message: "Latest transaction saved to CSV" }), { status: 200 });
  } catch (err) {
    console.error("CSV Save Error:", err);
    return new Response(JSON.stringify({ error: "Failed to save transaction" }), { status: 500 });
  }
}
