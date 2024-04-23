import { BaseFirestoreRepository, CustomRepository, IWherePropParam, getRepository } from 'fireorm';
import { generateBookingId } from '../helpers/fields';
import { Booking2, type Booking2Item } from '../models/booking2';

interface CreateFromData {
  category: string;
  items: Booking2Item[];
}

@CustomRepository(Booking2)
export class Booking2Repository extends BaseFirestoreRepository<Booking2> {
  async createFromData(data: CreateFromData): Promise<Booking2 | null> {
    let booking = Booking2.fromJson({
      id: await generateBookingId(this),
      items: data.items
    });
    return await this.create(booking);
  }
}

export const getBooking2Repository = () => getRepository(Booking2) as Booking2Repository;
