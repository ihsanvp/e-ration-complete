import { Collection, ISubCollection, SubCollection } from 'fireorm';

export interface ICategory {
  id: string;
  name: string;
}

export class CategoryItem {
  id!: string;
  name!: string;
  unit!: string;
  quantity!: number;
}

export interface CategoryJson {
  id: string;
  name: string;
  created: string;
  items?: Array<CategoryItem>;
}

@Collection()
export class Category implements ICategory {
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
