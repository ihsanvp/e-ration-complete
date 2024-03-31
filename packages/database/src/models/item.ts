import { Collection } from 'fireorm';

export type ItemCreate = Pick<Item, 'name' | 'unit'>;

export interface ItemJson {
  id: string;
  name: string;
  unit: string;
  created: string;
}

@Collection()
export class Item {
  id!: string;
  name!: string;
  unit!: string;
  created!: Date;

  toJson(): ItemJson {
    return {
      id: this.id,
      name: this.name,
      unit: this.unit,
      created: this.created.toISOString()
    };
  }

  static fromJson(data: ItemJson): Item {
    const item = new Item();
    item.id = data.id;
    item.name = data.name;
    item.unit = data.unit;
    item.created = new Date(data.created);
    return item;
  }

  static new(data: ItemCreate): Item {
    const item = new Item();
    item.name = data.name;
    item.unit = data.unit;
    return item;
  }
}
