import { Collection } from 'fireorm';
import { CategoryItemJson } from './category';

export interface IBooking2 {
  id: string;
  category: string;
  items: CategoryItemJson[];
  created: string;
}

@Collection('Bookings2')
export class Booking2 {
  id!: string;
  category!: string;
  items!: CategoryItemJson[];
  created!: Date;

  toJson(): IBooking2 {
    return {
      id: this.id,
      category: this.category,
      items: this.items,
      created: this.created.toISOString()
    };
  }

  static fromJson(data: IBooking2): Booking2 {
    const booking = new Booking2();
    booking.id = data.id;
    booking.category = data.category;
    booking.items = data.items;
    booking.created = new Date(data.created);
    return booking;
  }
}
