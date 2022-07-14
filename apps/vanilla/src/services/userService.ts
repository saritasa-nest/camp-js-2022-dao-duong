import { UserMapper } from '@js-camp/core/mappers/user/user.mapper';
import { User } from '@js-camp/core/models/user/user';

import { api } from '../api/API';
import { Token } from '../scripts/constants';

import { StorageService } from './storageService';

export namespace UserService {

  /** Get user.*/
  export async function getUser(): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { data } = await api.get('/users/profile/', { headers: { Authorization: `Bearer ${StorageService.get(Token.Access)}` } });
    return UserMapper.fromDto(data);
  }
}
