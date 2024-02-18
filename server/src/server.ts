import { client, createTables } from "./db.ts";

const init = async () => {
  console.log("Connecting to database...");
  await client.connect();
  console.log("Connected to database successfully");

  await createTables();
  console.log("Created tables successfully");
};

init();
