import { Collection } from 'fireorm';
import { CategoryItemJson, CategoryJson } from './category';
import { IUser } from './user';

type UserType = Omit<IUser, 'category'>;
type CategoryType = Omit<CategoryJson, 'items' | 'created'>;

export interface IBooking {
  id: string;
  user: UserType;
  category: CategoryType;
  items: CategoryItemJson[];
  created: string;
}

@Collection()
export class Booking {
  id!: string;
  user!: UserType;
  category!: CategoryType;
  items!: CategoryItemJson[];
  created!: Date;

  toJson(): IBooking {
    return {
      id: this.id,
      user: this.user,
      category: this.category,
      items: this.items,
      created: this.created.toISOString()
    };
  }

  static fromJson(data: IBooking): Booking {
    const booking = new Booking();
    booking.id = data.id;
    booking.user = data.user;
    booking.category = data.category;
    booking.items = data.items;
    booking.created = new Date(data.created);
    return booking;
  }
}
