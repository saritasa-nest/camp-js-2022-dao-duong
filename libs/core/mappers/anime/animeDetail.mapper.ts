import { AnimeDetailDto } from '../../dtos/anime/animeDetail.dto';

import { AnimeDetail } from '../../models/anime/animeDetail';

import { DateRangeMapper } from '../dateRange.mapper';

import { StudioMapper } from './studio.mapper';
export namespace AnimeDetailMapper {

  /**
   * Maps AnimeDto to Anime model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDetailDto): AnimeDetail {
    return new AnimeDetail({
      id: dto.id,
      image: dto.image,
      englishTitle: dto.title_eng,
      japaneseTitle: dto.title_jpn,
      aired: DateRangeMapper.fromDto(dto.aired),
      type: dto.type,
      status: dto.status,
      synopsis: dto.synopsis,
      airing: dto.airing,
      studioList: dto.studios_data.map(studio => StudioMapper.fromDto(studio)),
      genreList: dto.genres_data.map(genre => StudioMapper.fromDto(genre)),
      youtubeTrailerId: dto.trailer_youtube_id,
    });
  }
}
