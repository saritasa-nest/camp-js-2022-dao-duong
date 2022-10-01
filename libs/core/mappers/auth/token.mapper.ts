import { Token } from '../../models/auth/token';

import { TokenDto } from '../../dtos/auth/token.dto';

export namespace TokenMapper {

  /**
   * Maps TokenDto to Token model.
   * @param dto Token dto.
   */
  export function fromDto(dto: TokenDto): Token {
    return new Token({
      accessToken: dto.access,
      refreshToken: dto.refresh,
    });
  }
}
