import pg from "pg";
import { v4 as uuidv4 } from "uuid"; // importing like this because I was getting some errors before and this is what the uuid documentation recommends

import { Customer } from "./types";

export const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_reservation_planner"
);

export const createTables = async () => {
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

export const createCustomer = async ({ name }): Promise<Customer> => {
  const SQL = /*sql*/ `
    INSERT INTO customers(id, name) 
    VALUES($1, $2)
    RETURNING *;
  `;
  const response = await client.query(SQL, [uuidv4(), name]);
  return response.rows[0] as Customer;
};
