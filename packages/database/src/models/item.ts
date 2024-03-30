import { Collection } from 'fireorm';

type ItemCreate = Omit<Item, 'id'>;

@Collection()
export class Item {
  id!: string;
  name!: string;
  unit!: string;

  static new(data: ItemCreate): Item {
    const item = new Item();
    item.name = data.name;
    item.unit = data.unit;
    return item;
  }
}
