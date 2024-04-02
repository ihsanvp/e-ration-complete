import { BaseFirestoreRepository, CustomRepository, getRepository } from 'fireorm';
import { IUser, User } from '../models/user';

@CustomRepository(User)
export class UserRepository extends BaseFirestoreRepository<User> {
  async serialize(input: User | User[]): Promise<IUser | IUser[]> {
    if (Array.isArray(input)) {
      return input.map((user) => user.toJson());
    }
    return input.toJson();
  }
}

export const getUserRepository = () => getRepository(User) as UserRepository;
