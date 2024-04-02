import { BaseFirestoreRepository, CustomRepository, getRepository } from 'fireorm';
import { Booking } from '../models/booking';
import { CategoryItemJson } from '../models/category';
import { getUserRepository } from './user.repository';
import { getCategoryRepository } from './category.repository';
import { generateBookingId } from '../helpers/fields';

interface CreateFromData {
  uid: string;
  category: string;
  items: CategoryItemJson[];
}

@CustomRepository(Booking)
export class BookingRepository extends BaseFirestoreRepository<Booking> {
  async createFromData(data: CreateFromData): Promise<Booking | null> {
    const user = await getUserRepository().findById(data.uid);
    if (!user) {
      return null;
    }
    const category = await getCategoryRepository().findById(data.category);
    if (!category) {
      return null;
    }
    let booking = Booking.fromJson({
      id: await generateBookingId(this),
      user: {
        id: user.id,
        name: user.name,
        location: user.location,
        phoneNumber: user.phoneNumber
      },
      category: {
        id: category.id,
        name: category.name
      },
      items: data.items,
      created: new Date().toISOString()
    });
    return await this.create(booking);
  }
}

export const getBookingRepository = () => getRepository(Booking) as BookingRepository;
