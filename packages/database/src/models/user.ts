import { Collection } from 'fireorm';

export interface IUser {
  id: string;
  name: string;
  location: string;
  phoneNumber: string;
  category: string | null;
}

@Collection()
export class User implements IUser {
  id!: string;
  name!: string;
  location!: string;
  phoneNumber!: string;
  category!: string | null;

  toJson(): IUser {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      phoneNumber: this.phoneNumber,
      category: this.category
    };
  }

  static fromJson(data: IUser): User {
    const user = new User();
    user.id = data.id;
    user.name = data.name;
    user.location = data.location;
    user.phoneNumber = data.phoneNumber;
    user.category = data.category;
    return user;
  }
}
