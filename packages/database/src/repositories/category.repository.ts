import { BaseFirestoreRepository, CustomRepository, IWherePropParam, getRepository } from 'fireorm';
import { Category, CategoryItem } from '../models/category';
import { Item } from '../models/item';

interface PaginationConfig {
  orderBy: IWherePropParam<Category>;
  limit: number;
  cursor: string | null;
}

@CustomRepository(Category)
export class CategoryRepository extends BaseFirestoreRepository<Category> {
  async createWithItems(category: Category, items: CategoryItem[]) {
    await this.create(category);
    const batch = category.items.createBatch();

    items.forEach((item) => batch.create(item));
    await batch.commit();
    return category;
  }

  async paginate(config: PaginationConfig): Promise<Category[]> {
    if (config.cursor) {
      const cursor = await this.firestoreColRef.doc(config.cursor).get();
      return this.orderByAscending(config.orderBy)
        .customQuery(async (q) => q.startAfter(cursor))
        .limit(config.limit)
        .find();
    }
    return this.orderByAscending(config.orderBy).limit(config.limit).find();
  }
}

export const getCategoryRepository = () => getRepository(Category) as CategoryRepository;
