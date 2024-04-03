import { BaseFirestoreRepository, CustomRepository, IWherePropParam, getRepository } from 'fireorm';
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

interface PaginationConfig {
  orderBy: IWherePropParam<Booking>;
  limit: number;
  cursor: string | null;
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
        phoneNumber: user.phoneNumber,
        created: new Date().toISOString()
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

  async paginate(config: PaginationConfig): Promise<Booking[]> {
    if (config.cursor) {
      const cursor = await this.firestoreColRef.doc(config.cursor).get();
      return this.orderByAscending(config.orderBy)
        .customQuery(async (q) => q.startAfter(cursor))
        .limit(config.limit)
        .find();
    }
    return this.orderByAscending(config.orderBy).limit(config.limit).find();
  }
}

export const getBookingRepository = () => getRepository(Booking) as BookingRepository;
