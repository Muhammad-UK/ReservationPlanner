import { client, createTables, createCustomer } from "./db";

const init = async () => {
  console.log("Connecting to database...");
  await client.connect();
  console.log("Connected to database successfully");

  await createTables();
  console.log("Created tables successfully");

  const [Alex, Bob, Alice, Joe] = await Promise.all([
    createCustomer({ name: "Alex" }),
    createCustomer({ name: "Bob" }),
    createCustomer({ name: "Alice" }),
    createCustomer({ name: "Joe" }),
  ]);
};

init();
