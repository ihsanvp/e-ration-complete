import { BaseFirestoreRepository, IEntity } from 'fireorm';

export async function generateBookingId<T extends IEntity>(repo: BaseFirestoreRepository<T>) {
  const DIGITS = '0123456789';
  let id = '';

  for (let i = 0; i < 6; i++) {
    id += DIGITS.charAt(Math.floor(Math.random() * DIGITS.length));
  }

  const data = await repo.findById(id);

  if (data) {
    return generateBookingId(repo);
  }

  return id;
}
