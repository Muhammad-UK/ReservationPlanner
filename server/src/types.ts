export type Customer = {
  id: string;
  name: string;
};
export type Restaurant = {
  id: string;
  name: string;
};
export type Name = {
  name: string;
};
export type Reservation = {
  id: string;
  date: Date;
  party_count: number;
  customer_id: string;
  restaurant_id: string;
};
export type ReservationParams = {
  reservation_date: Date;
  restaurant_id: string;
  customer_id: string;
};
