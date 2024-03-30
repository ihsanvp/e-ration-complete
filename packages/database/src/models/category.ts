import { Collection, ISubCollection, SubCollection } from 'fireorm';

export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoryItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
}

export class CategoryItem implements ICategoryItem {
  id!: string;
  name!: string;
  unit!: string;
  quantity!: number;
}

type CategoryNewData = Omit<ICategory, 'id'> & {
  items: Array<ICategoryItem>;
};

@Collection()
export class Category implements ICategory {
  id!: string;
  name!: string;

  @SubCollection(CategoryItem)
  items!: ISubCollection<CategoryItem>;

  async toJson() {
    return {
      id: this.id,
      name: this.name,
      items: await this.items.find()
    };
  }

  static fromJson(data: ICategory): Category {
    const category = new Category();
    category.id = data.id;
    category.name = data.name;
    return category;
  }
}
