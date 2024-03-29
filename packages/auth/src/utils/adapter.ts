export abstract class Adapter<UserType> {
  abstract getUser(uid: string): Promise<UserType | null>;
}
