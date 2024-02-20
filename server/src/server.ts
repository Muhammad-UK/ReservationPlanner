import {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  createReservation,
  fetchReservations,
} from "./db";

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
  const [RedLobster, OliveGarden, CheesecakeFactory] = await Promise.all([
    createRestaurant({ name: "RedLobster" }),
    createRestaurant({ name: "OliveGarden" }),
    createRestaurant({ name: "CheesecakeFactory" }),
  ]);

  console.log(await fetchCustomers());
  console.log(await fetchRestaurants());

  const [reservation1, reservation2] = await Promise.all([
    createReservation({
      reservation_date: new Date("2024-04-12"),
      restaurant_id: RedLobster.id,
      customer_id: Alex.id,
    }),
    createReservation({
      reservation_date: new Date("2024-03-20"),
      restaurant_id: CheesecakeFactory.id,
      customer_id: Joe.id,
    }),
  ]);
  console.log(await fetchReservations());
};

init();
