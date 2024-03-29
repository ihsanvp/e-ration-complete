import { Collection } from 'fireorm';

@Collection()
export class User {
  id!: string;
  name!: string;
  location!: string;
  phoneNumber!: string;
}
