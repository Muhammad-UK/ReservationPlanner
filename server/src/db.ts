import pg from "pg";

const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_reservation_planner"
);

const createTables = async () => {
  const SQL = /*sql*/ `
        DROP TABLE IF EXISTS reservations;
        DROP TABLE IF EXISTS customers;
        DROP TABLE IF EXISTS restaurants;
        
        CREATE TABLE restaurants(
            id UUID PRIMARY KEY,
            name VARCHAR(100)
        );

        CREATE TABLE customers(
            id UUID PRIMARY KEY,
            name VARCHAR(100)
        );

        CREATE TABLE reservations(
            id UUID PRIMARY KEY,
            date DATE NOT NULL,
            party_count INTEGER NOT NULL,
            restaurant_id UUID REFERENCES restaurants(id) NOT NULL,
            customer_id UUID REFERENCES customers(id) NOT NULL
        );
    `;
  await client.query(SQL);
};

export { client, createTables };
