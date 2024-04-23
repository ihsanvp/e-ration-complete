import { Collection } from 'fireorm';
import { CategoryItemJson } from './category';

export interface Booking2Item {
  name: string;
  ltr: number | undefined;
  quantity: number | undefined;
}

export interface IBooking2 {
  id: string;
  items: Booking2Item[];
}

@Collection('Bookings2')
export class Booking2 {
  id!: string;
  items!: Booking2Item[];

  toJson(): IBooking2 {
    return {
      id: this.id,
      items: this.items
    };
  }

  static fromJson(data: IBooking2): Booking2 {
    const booking = new Booking2();
    booking.id = data.id;
    booking.items = data.items;
    return booking;
  }
}
