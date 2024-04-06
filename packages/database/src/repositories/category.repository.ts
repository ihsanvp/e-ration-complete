import {
  BaseFirestoreRepository,
  CustomRepository,
  IWherePropParam,
  getRepository,
  runTransaction
} from 'fireorm';
import { Category, CategoryItem, CategoryItemJson, CategoryJson } from '../models/category';
import { Item } from '../models/item';
import { getUserRepository } from './user.repository';
import { User } from '../models/user';

interface PaginationConfig {
  orderBy: IWherePropParam<Category>;
  limit: number;
  cursor: string | null;
}

interface CreateWithData {
  name: string;
  items: Array<CategoryItemJson>;
}

@CustomRepository(Category)
export class CategoryRepository extends BaseFirestoreRepository<Category> {
  async createFromData(data: CreateWithData): Promise<Category> {
    let category = new Category();
    category.id = `category__${data.name}`;
    category.name = data.name;
    category.created = new Date();
    category = await getCategoryRepository().create(category);
    if (Array.isArray(data.items) && data.items.length) {
      const batch = category.items.createBatch();
      data.items.forEach((item) => batch.create(CategoryItem.fromJson(item)));
      await batch.commit();
    }
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

  async serialize<T extends Category | Category[]>(
    input: T
  ): Promise<CategoryJson[] | CategoryJson> {
    if (Array.isArray(input)) {
      return runTransaction(async (tran) => {
        const serialized = input.map((cat) => cat.toJson());
        for (let i = 0; i < serialized.length; i++) {
          const category = input[i];
          const items = await category.items.find();
          if (items) {
            serialized[i].items = items.map((item) => item.toJson());
          }
        }
        return serialized;
      });
    }
    const category = input.toJson();
    const items = await input.items.find();
    if (items) {
      category.items = items.map((item) => item.toJson());
    }
    return category;
  }

  async getLinkedUsers(category: Category): Promise<User[]> {
    return await getUserRepository()
      .whereEqualTo((user) => user.category?.id, category.id)
      .find();
  }

  async forceDeleteWithLinkedUsers(category: Category) {
    const users = await this.getLinkedUsers(category);
    if (users.length) {
      const batch = getUserRepository().createBatch();
      for (const user of users) {
        user.category = null;
        batch.update(user);
      }
      await batch.commit();
    }
    await this.delete(category.id);
  }
}

export const getCategoryRepository = () => getRepository(Category) as CategoryRepository;
