import { BaseFirestoreRepository, CustomRepository, getRepository } from 'fireorm';
import { Category, CategoryItem } from '../models/category';
import { Item } from '../models/item';

@CustomRepository(Category)
export class CategoryRepository extends BaseFirestoreRepository<Category> {
  async createWithItems(category: Category, items: CategoryItem[]) {
    await this.create(category);
    const batch = category.items.createBatch();

    items.forEach((item) => batch.create(item));
    await batch.commit();
    return category;
  }
}

export const getCategoryRepository = () => getRepository(Category) as CategoryRepository;
