import { UserMapper } from '@js-camp/core/mappers/user/user.mapper';
import { User } from '@js-camp/core/models/user/user';

import { http } from '..';

export namespace UserService {

  /** Fetch user data. */
  export async function fetchUser(): Promise<User> {
    const userResponse = await http.get('/users/profile/');
    return UserMapper.fromDto(userResponse.data);
  }
}
