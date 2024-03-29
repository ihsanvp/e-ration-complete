import { Adapter } from '@e-ration/auth';
import {
	type User,
	connectToFirebaseDatabase,
	UserRepository,
	getUserRepository
} from '@e-ration/database';

export class AdapterFirestore extends Adapter<User> {
	repository: UserRepository;
	constructor(credential: string, projectId: string) {
		super();
		connectToFirebaseDatabase({
			credential,
			projectId
		});
		this.repository = getUserRepository();
	}
	getUser(uid: string): Promise<User | null> {
		throw new Error('Method not implemented.');
	}
}
