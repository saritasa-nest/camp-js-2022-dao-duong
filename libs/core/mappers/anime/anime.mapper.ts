import { Anime } from '@js-camp/core/models/anime/anime';

import { AnimeDto } from '../../dtos/anime/anime.dto';

import { DateRangeMapper } from '../dateRange.mapper';
export namespace AnimeMapper {

  /**
   * Maps AnimeDto to Anime model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    return new Anime({
      id: dto.id,
      image: dto.image,
      englishTitle: dto.title_eng,
      japaneseTitle: dto.title_jpn,
      aired: DateRangeMapper.fromDto(dto.aired),
      type: dto.type,
      status: dto.status,
    });
  }
}
