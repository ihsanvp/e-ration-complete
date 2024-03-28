import { Collection } from 'fireorm';

type ItemCreate = Pick<Item, 'name' | 'unit'>;

@Collection()
export class Item {
  id!: string;
  name!: string;
  unit!: string;

  static new(data: ItemCreate) {
    const item = new Item();
    item.name = data.name;
    item.unit = data.unit;
    return item;
  }
}
