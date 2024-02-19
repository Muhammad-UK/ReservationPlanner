import {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
} from "./db";

const init = async () => {
  console.log("Connecting to database...");
  await client.connect();
  console.log("Connected to database successfully");

  await createTables();
  console.log("Created tables successfully");

  const [Alex, Bob, Alice, Joe, RedLobster, OliveGarden, CheesecakeFactory] =
    await Promise.all([
      createCustomer({ name: "Alex" }),
      createCustomer({ name: "Bob" }),
      createCustomer({ name: "Alice" }),
      createCustomer({ name: "Joe" }),
      createRestaurant({ name: "RedLobster" }),
      createRestaurant({ name: "OliveGarden" }),
      createRestaurant({ name: "CheesecakeFactory" }),
    ]);
  console.log(await fetchCustomers());
  console.log(await fetchRestaurants());
};

init();
