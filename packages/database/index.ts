export { Item } from './src/models/item';
export { User, type IUser } from './src/models/user';
export { Category, ICategory, CategoryItem } from './src/models/category';

export { getItemRepository } from './src/repositories/item.repository';
export { getUserRepository, UserRepository } from './src/repositories/user.repository';
export { getCategoryRepository, CategoryRepository } from './src/repositories/category.repository';

export { connectToFirebaseDatabase } from './src/helpers/connection';
