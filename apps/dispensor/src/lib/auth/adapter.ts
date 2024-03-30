import { Adapter, getFirebaseUserWithId, type Session } from '@e-ration/auth';
import {
	User,
	connectToFirebaseDatabase,
	UserRepository,
	getUserRepository,
	type IUser
} from '@e-ration/database';
import type { RegisterData } from './config.auth';

export class AdapterFirestore extends Adapter<IUser, RegisterData> {
	repository: UserRepository;
	credential: string;

	constructor(credential: string, projectId: string) {
		super();
		connectToFirebaseDatabase({
			credential,
			projectId
		});
		this.repository = getUserRepository();
		this.credential = credential;
	}

	async getUser(uid: string): Promise<User | null> {
		return await this.repository.findById(uid);
	}

	async createUser(data: RegisterData, session: Session): Promise<void> {
		const firebaseUser = await getFirebaseUserWithId(this.credential, session.uid);
		if (!firebaseUser) {
			throw new Error('cannot get firebase user in adapter.createUser()');
		}
		const user = User.fromJson({
			id: session.uid,
			name: data.name,
			location: data.location,
			phoneNumber: firebaseUser.phoneNumber!
		});
		await this.repository.create(user);
	}
}
