import { UserMapper } from '@js-camp/core/mappers/user/user.mapper';
import { User } from '@js-camp/core/models/user/user';

import { api } from '../api/api';

export namespace UserService {

  /** Get user.*/
  export async function getUser(): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const userResponse = await api.get('/users/profile/');
    return UserMapper.fromDto(userResponse.data);
  }
}
