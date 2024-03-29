import { BaseFirestoreRepository, CustomRepository, getRepository } from 'fireorm';
import { User } from '../models/user';

@CustomRepository(User)
export class UserRepository extends BaseFirestoreRepository<User> {}

export const getUserRepository = () => getRepository(User) as UserRepository;
