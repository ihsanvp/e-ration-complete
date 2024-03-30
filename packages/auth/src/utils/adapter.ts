import type { Session } from './session';

export abstract class Adapter<UserType, CreateUserDataType> {
  abstract getUser(uid: string): Promise<UserType | null>;
  abstract createUser(data: CreateUserDataType, session: Session): Promise<void>;
}
