import { AnimeTypeDto, AnimeStatusDto } from '../../dtos/anime/anime.dto';
import { AnimeType, AnimeStatus } from '../../models/anime/anime';

import { AnimeDetailDto, RatingDto, SeasonDto, SourceDto } from '../../dtos/anime/animeDetail.dto';

import { AnimeDetail, AnimeDetailPost, Rating, Season, Source } from '../../models/anime/animeDetail';

import { DateRangeMapper } from '../dateRange.mapper';

import { ANIME_TYPE_FROM_DTO_MAP, ANIME_STATUS_FROM_DTO_MAP } from './anime.mapper';

import { StudioMapper } from './studio.mapper';

export const ANIME_TYPE_TO_DTO_MAP: Readonly<Record<AnimeType, AnimeTypeDto>> = {
  [AnimeType.Movie]: AnimeTypeDto.Movie,
  [AnimeType.Music]: AnimeTypeDto.Music,
  [AnimeType.Ona]: AnimeTypeDto.Ona,
  [AnimeType.Ova]: AnimeTypeDto.Ova,
  [AnimeType.Special]: AnimeTypeDto.Special,
  [AnimeType.Tv]: AnimeTypeDto.Tv,
};

export const ANIME_STATUS_TO_DTO_MAP: Readonly<Record<AnimeStatus, AnimeStatusDto>> = {
  [AnimeStatus.Airing]: AnimeStatusDto.Airing,
  [AnimeStatus.Finished]: AnimeStatusDto.Finished,
  [AnimeStatus.NotYetAired]: AnimeStatusDto.NotYetAired,
};

const ANIME_SOURCE_TO_DTO_MAP: Readonly<Record<Source, SourceDto>> = {
  [Source.Book]: SourceDto.Book,
  [Source.CardGame]: SourceDto.CardGame,
  [Source.FourKomaManga]: SourceDto.FourKomaManga,
  [Source.Game]: SourceDto.Game,
  [Source.LightNovel]: SourceDto.LightNovel,
  [Source.Manga]: SourceDto.Manga,
  [Source.MixedMedia]: SourceDto.MixedMedia,
  [Source.Music]: SourceDto.Music,
  [Source.Novel]: SourceDto.Novel,
  [Source.Original]: SourceDto.Original,
  [Source.Other]: SourceDto.Other,
  [Source.PictureBook]: SourceDto.PictureBook,
  [Source.Radio]: SourceDto.Radio,
  [Source.Unknown]: SourceDto.Unknown,
  [Source.VisualNovel]: SourceDto.VisualNovel,
  [Source.WebManga]: SourceDto.WebManga,
  [Source.WebNovel]: SourceDto.WebNovel,
};

const ANIME_SOURCE_FROM_DTO_MAP: Readonly<Record<SourceDto, Source>> = {
  [SourceDto.Book]: Source.Book,
  [SourceDto.CardGame]: Source.CardGame,
  [SourceDto.FourKomaManga]: Source.FourKomaManga,
  [SourceDto.Game]: Source.Game,
  [SourceDto.LightNovel]: Source.LightNovel,
  [SourceDto.Manga]: Source.Manga,
  [SourceDto.MixedMedia]: Source.MixedMedia,
  [SourceDto.Music]: Source.Music,
  [SourceDto.Novel]: Source.Novel,
  [SourceDto.Original]: Source.Original,
  [SourceDto.Other]: Source.Other,
  [SourceDto.PictureBook]: Source.PictureBook,
  [SourceDto.Radio]: Source.Radio,
  [SourceDto.Unknown]: Source.Unknown,
  [SourceDto.VisualNovel]: Source.VisualNovel,
  [SourceDto.WebManga]: Source.WebManga,
  [SourceDto.WebNovel]: Source.WebNovel,
};

const ANIME_RATING_TO_DTO_MAP: Readonly<Record<Rating, RatingDto>> = {
  [Rating.G]: RatingDto.G,
  [Rating.PG13]: RatingDto.PG13,
  [Rating.PG]: RatingDto.PG,
  [Rating.R17]: RatingDto.R17,
  [Rating.RPlus]: RatingDto.RPlus,
  [Rating.RX]: RatingDto.RX,
  [Rating.Unknown]: RatingDto.Unknown,
};

const ANIME_RATING_FROM_DTO_MAP: Readonly<Record<RatingDto, Rating>> = {
  [RatingDto.G]: Rating.G,
  [RatingDto.PG13]: Rating.PG13,
  [RatingDto.PG]: Rating.PG,
  [RatingDto.R17]: Rating.R17,
  [RatingDto.RPlus]: Rating.RPlus,
  [RatingDto.RX]: Rating.RX,
  [RatingDto.Unknown]: Rating.Unknown,
};

const ANIME_SEASON_TO_DTO_MAP: Readonly<Record<Season, SeasonDto>> = {
  [Season.Fall]: SeasonDto.Fall,
  [Season.NonSeasonal]: SeasonDto.NonSeasonal,
  [Season.Spring]: SeasonDto.Spring,
  [Season.Summer]: SeasonDto.Summer,
  [Season.Winter]: SeasonDto.Winter,
};

const ANIME_SEASON_FROM_DTO_MAP: Readonly<Record<SeasonDto, Season>> = {
  [SeasonDto.Fall]: Season.Fall,
  [SeasonDto.NonSeasonal]: Season.NonSeasonal,
  [SeasonDto.Spring]: Season.Spring,
  [SeasonDto.Summer]: Season.Summer,
  [SeasonDto.Winter]: Season.Winter,
};

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
      studioIdList: dto.studios,
      studioList: dto.studios_data.map(studio => StudioMapper.fromDto(studio)),
      genreIdList: dto.genres,
      genreList: dto.genres_data.map(genre => StudioMapper.fromDto(genre)),
      youtubeTrailerId: dto.trailer_youtube_id,
      source: ANIME_SOURCE_FROM_DTO_MAP[dto.source],
      season: ANIME_SEASON_FROM_DTO_MAP[dto.season],
      rating: ANIME_RATING_FROM_DTO_MAP[dto.rating],
    });
  }

  /**
   * Maps AnimeDetailDto to AnimeDetail model.
   * @param animeData Anime data.
   */
  export function toDto(animeData: AnimeDetail | AnimeDetailPost): AnimeDetailDto {
    return {
      image: animeData.image,
      title_eng: animeData.englishTitle,
      title_jpn: animeData.japaneseTitle,
      aired: DateRangeMapper.toDto(animeData.aired),
      type: ANIME_TYPE_TO_DTO_MAP[animeData.type],
      status: ANIME_STATUS_TO_DTO_MAP[animeData.status],
      synopsis: animeData.synopsis,
      airing: animeData.airing,
      studios: animeData.studioList.map(studio => studio.id),
      genres: animeData.genreList.map(genre => genre.id),
      trailer_youtube_id: animeData.youtubeTrailerId,
      source: ANIME_SOURCE_TO_DTO_MAP[animeData.source],
      season: ANIME_SEASON_TO_DTO_MAP[animeData.season],
      rating: ANIME_RATING_TO_DTO_MAP[animeData.rating],
    } as unknown as AnimeDetailDto;
  }
}
