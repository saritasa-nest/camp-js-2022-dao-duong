import { AnimeDetailDto } from '../../dtos/anime/animeDetail.dto';

import { AnimeDetail } from '../../models/anime/animeDetail';

import { DateRangeMapper } from '../dateRange.mapper';

import { ANIME_TYPE_FROM_DTO_MAP, ANIME_STATUS_FROM_DTO_MAP } from './anime.mapper';

import { StudioMapper } from './studio.mapper';
export namespace AnimeDetailMapper {

  /**
   * Maps AnimeDetailDto to AnimeDetail model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeDetailDto): AnimeDetail {
    return new AnimeDetail({
      id: dto.id,
      image: dto.image,
      englishTitle: dto.title_eng,
      japaneseTitle: dto.title_jpn,
      aired: DateRangeMapper.fromDto(dto.aired),
      type: ANIME_TYPE_FROM_DTO_MAP[dto.type],
      status: ANIME_STATUS_FROM_DTO_MAP[dto.status],
      synopsis: dto.synopsis,
      airing: dto.airing,
      studioList: dto.studios_data.map(studio => StudioMapper.fromDto(studio)),
      genreList: dto.genres_data.map(genre => StudioMapper.fromDto(genre)),
      youtubeTrailerId: dto.trailer_youtube_id,
    });
  }
}
