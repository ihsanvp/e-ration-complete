import { BaseFirestoreRepository, CustomRepository, getRepository } from 'fireorm';
import { Item, ItemCreate } from '../models/item';

@CustomRepository(Item)
class CustomItemRepository extends BaseFirestoreRepository<Item> {
  async createWithData(data: ItemCreate) {
    const item = new Item();
    (item.id = `item__${data.name}`), (item.name = data.name);
    item.unit = data.unit;
    item.created = new Date();
    return await this.create(item);
  }
}

export const getItemRepository = () => getRepository(Item) as CustomItemRepository;
