import { BaseFirestoreRepository, CustomRepository, IWherePropParam, getRepository } from 'fireorm';
import { CategoryItemJson } from '../models/category';
import { generateBookingId } from '../helpers/fields';
import { Booking2 } from '../models/booking2';

interface CreateFromData {
  category: string;
  items: CategoryItemJson[];
}

@CustomRepository(Booking2)
export class Booking2Repository extends BaseFirestoreRepository<Booking2> {
  async createFromData(data: CreateFromData): Promise<Booking2 | null> {
    let booking = Booking2.fromJson({
      id: await generateBookingId(this),
      category: data.category,
      items: data.items,
      created: new Date().toISOString()
    });
    return await this.create(booking);
  }
}

export const getBooking2Repository = () => getRepository(Booking2) as Booking2Repository;
