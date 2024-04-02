import { Collection, ISubCollection, SubCollection } from 'fireorm';

export interface CategoryJson {
  id: string;
  name: string;
  created: string;
  items?: Array<CategoryItemJson>;
}

export interface CategoryItemJson {
  id: string;
  name: string;
  unit: string;
  quantity: number;
}

export class CategoryItem {
  id!: string;
  name!: string;
  unit!: string;
  quantity!: number;

  toJson(): CategoryItemJson {
    return {
      id: this.id,
      name: this.name,
      unit: this.unit,
      quantity: this.quantity
    };
  }

  static fromJson(data: CategoryItemJson): CategoryItem {
    const item = new CategoryItem();
    item.id = data.id;
    item.name = data.name;
    item.unit = data.unit;
    item.quantity = data.quantity;
    return item;
  }
}

@Collection()
export class Category {
  id!: string;
  name!: string;
  created!: Date;

  @SubCollection(CategoryItem)
  items!: ISubCollection<CategoryItem>;

  toJson(): CategoryJson {
    return {
      id: this.id,
      name: this.name,
      created: this.created.toISOString()
    };
  }

  static fromJson(data: CategoryJson): Category {
    const category = new Category();
    category.id = data.id;
    category.name = data.name;
    category.created = new Date(data.created);
    return category;
  }
}
