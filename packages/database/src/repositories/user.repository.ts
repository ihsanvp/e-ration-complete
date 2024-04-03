import { BaseFirestoreRepository, CustomRepository, IWherePropParam, getRepository } from 'fireorm';
import { IUser, User } from '../models/user';

interface PaginationConfig {
  orderBy: IWherePropParam<User>;
  limit: number;
  cursor: string | null;
}

@CustomRepository(User)
export class UserRepository extends BaseFirestoreRepository<User> {
  async serialize(input: User | User[]): Promise<IUser | IUser[]> {
    if (Array.isArray(input)) {
      return input.map((user) => user.toJson());
    }
    return input.toJson();
  }

  async paginate(config: PaginationConfig): Promise<User[]> {
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

export const getUserRepository = () => getRepository(User) as UserRepository;
