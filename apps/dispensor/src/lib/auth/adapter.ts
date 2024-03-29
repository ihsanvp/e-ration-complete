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
	async getUser(uid: string): Promise<User | null> {
		return await this.repository.findById(uid);
	}
}
