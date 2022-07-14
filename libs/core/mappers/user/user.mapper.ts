import { User } from '@js-camp/core/models/user/user';

import { UserDto } from '../../dtos/user/user.dto';

export namespace UserMapper {

  /**
   * Maps dto to model.
   * @param dto User dto.
   */
  export function fromDto(dto: UserDto): User {
    return new User({
      email: dto.email,
      firstName: dto.first_name,
      lastName: dto.last_name,
      avatar: dto.avatar,
      created: dto.created,
      modified: dto.modified,
    });
  }
}
