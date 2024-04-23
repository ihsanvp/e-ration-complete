import { Collection } from 'fireorm';

type CategoryType = {
  id: string;
  name: string;
};

export interface IUser {
  id: string;
  name: string;
  rationNumber: string;
  phoneNumber: string;
  category: CategoryType | null;
  created: string;
}

@Collection()
export class User {
  id!: string;
  name!: string;
  rationNumber!: string;
  phoneNumber!: string;
  category!: CategoryType | null;
  created!: Date;

  toJson(): IUser {
    return {
      id: this.id,
      name: this.name,
      rationNumber: this.rationNumber,
      phoneNumber: this.phoneNumber,
      category: this.category,
      created: this.created.toISOString()
    };
  }

  static fromJson(data: IUser): User {
    const user = new User();
    user.id = data.id;
    user.name = data.name;
    user.rationNumber = data.rationNumber;
    user.phoneNumber = data.phoneNumber;
    user.category = data.category;
    user.created = new Date(data.created);
    return user;
  }
}
