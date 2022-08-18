import { AnimeDetailDto } from '../../dtos/anime/animeDetail.dto';

import { AnimeDetail } from '../../models/anime/animeDetail';

import { DateRangeMapper } from '../dateRange.mapper';

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
      type: dto.type,
      status: dto.status,
      synopsis: dto.synopsis,
      airing: dto.airing,
      studioIdList: dto.studios,
      studioList: dto.studios_data.map(studio => StudioMapper.fromDto(studio)),
      genreIdList: dto.genres,
      genreList: dto.genres_data.map(genre => StudioMapper.fromDto(genre)),
      youtubeTrailerId: dto.trailer_youtube_id,
      source: dto.source,
      season: dto.season,
      rating: dto.rating,
    });
  }

  /**
   * Maps AnimeDetailDto to AnimeDetail model.
   * @param animeData Anime data.
   */
  export function toDto(animeData: AnimeDetail): AnimeDetailDto {
    return {
      image: animeData.image,
      title_eng: animeData.englishTitle,
      title_jpn: animeData.japaneseTitle,
      aired: {
        start: animeData.aired.start,
        end: animeData.aired.end,
      },
      type: animeData.type,
      status: animeData.status,
      synopsis: animeData.synopsis,
      airing: animeData.airing,
      studios: animeData.studioIdList,
      genres: animeData.genreIdList,
      trailer_youtube_id: animeData.youtubeTrailerId,
      source: animeData.source,
      season: animeData.season,
      rating: animeData.rating,
    } as AnimeDetailDto;
  }
}
