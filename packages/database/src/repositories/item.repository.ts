import {
  BaseFirestoreRepository,
  CustomRepository,
  IWherePropParam,
  getRepository,
  runTransaction
} from 'fireorm';
import { Item, ItemCreate } from '../models/item';
import {
  DocumentData,
  DocumentReference,
  collection,
  getAggregateFromServer,
  getCountFromServer,
  getDoc
} from 'firebase/firestore';
import { Category } from '../models/category';

interface PaginationConfig {
  orderBy: IWherePropParam<Item>;
  limit: number;
  cursor: string | null;
}

@CustomRepository(Item)
class CustomItemRepository extends BaseFirestoreRepository<Item> {
  async createWithData(data: ItemCreate) {
    const item = new Item();
    (item.id = `item__${data.name}`), (item.name = data.name);
    item.unit = data.unit;
    item.type = data.type;
    item.created = new Date();
    return await this.create(item);
  }

  async count(): Promise<number> {
    const snapshot = await this.firestoreColRef.count().get();
    return snapshot.data().count;
  }

  async paginate(config: PaginationConfig): Promise<Item[]> {
    if (config.cursor) {
      const cursor = await this.firestoreColRef.doc(config.cursor).get();
      return this.orderByAscending(config.orderBy)
        .customQuery(async (q) => q.startAfter(cursor))
        .limit(config.limit)
        .find();
    }
    return this.orderByAscending(config.orderBy).limit(config.limit).find();
  }

  async deleteWithLinkedCategoryItems(id: string) {
    return await runTransaction(async (tran) => {
      const itemRepo = tran.getRepository(Item);
      const categoryRepo = tran.getRepository(Category);

      const categories = await categoryRepo.find();
      for (const category of categories) {
        category.items.delete(id);
      }
      itemRepo.delete(id);
    });
  }
}

export const getItemRepository = () => getRepository(Item) as CustomItemRepository;
