import { Collection } from 'fireorm';

type CategoryType = {
  id: string;
  name: string;
};

export interface IUser {
  id: string;
  name: string;
  location: string;
  phoneNumber: string;
  category: CategoryType | null;
  created: string;
}

@Collection()
export class User {
  id!: string;
  name!: string;
  location!: string;
  phoneNumber!: string;
  category!: CategoryType | null;
  created!: Date;

  toJson(): IUser {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      phoneNumber: this.phoneNumber,
      category: this.category,
      created: this.created.toISOString()
    };
  }

  static fromJson(data: IUser): User {
    const user = new User();
    user.id = data.id;
    user.name = data.name;
    user.location = data.location;
    user.phoneNumber = data.phoneNumber;
    user.category = data.category;
    user.created = new Date(data.created);
    return user;
  }
}
