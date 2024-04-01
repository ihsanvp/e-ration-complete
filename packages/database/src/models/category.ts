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
