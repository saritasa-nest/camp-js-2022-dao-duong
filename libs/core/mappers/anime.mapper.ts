import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { AiredMapper } from './aired.mapper';
export namespace AnimeMapper {

  /**
   * Create an AnimeDto object from an AnimeDTO object.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    return new Anime({
      id: dto.id,
      image: dto.image,
      englishTitle: dto.title_eng,
      japaneseTitle: dto.title_jpn,
      aired: AiredMapper.fromDto(dto.aired),
      type: dto.type,
      status: dto.status,
    });
  }
}
