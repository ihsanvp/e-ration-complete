import { BaseFirestoreRepository, CustomRepository, getRepository } from 'fireorm';
import { Item } from '../models/item';

@CustomRepository(Item)
class CustomItemRepository extends BaseFirestoreRepository<Item> {}

export const getItemRepository = () => getRepository(Item) as CustomItemRepository;
