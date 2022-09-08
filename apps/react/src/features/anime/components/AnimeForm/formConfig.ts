import * as Yup from 'yup';
import { AnimeDetailPost, AnimeStatus, AnimeType, Genre, Studio } from '@js-camp/core/models/anime';
import { Rating, Season, Source } from '@js-camp/core/models/anime/';
import { DateRange } from '@js-camp/core/models/dateRange';

export const ERROR_MESSAGES = {
  requiredType: 'Type is required!',
  requiredStatus: 'Status is required!',
  requiredSource: 'Source is required!',
  requiredAiring: 'Airing is required!',
  requiredRating: 'Rating is required!',
  requiredSeason: 'Season is required!',
  requiredSynopsis: 'Synopsis is required!',
  requiredStudios: 'Studios is required!',
  requiredGenres: 'Genres is required!',
};

export const AnimeFormSchema = Yup.object().shape({
  image: Yup.string(),
  englishTitle: Yup.string(),
  japaneseTitle: Yup.string(),
  aired: Yup.object().shape({
    start: Yup.date().nullable(),
    end: Yup.date().nullable(),
  }),
  type: Yup.mixed<AnimeType>().oneOf(Object.values(AnimeType))
    .required(ERROR_MESSAGES.requiredType),
  status: Yup.mixed<AnimeStatus>().oneOf(Object.values(AnimeStatus))
    .required(ERROR_MESSAGES.requiredStatus),
  synopsis: Yup.string().required(ERROR_MESSAGES.requiredSynopsis),
  airing: Yup.boolean().required(ERROR_MESSAGES.requiredAiring),
  studioIdList: Yup.array<Studio['id'][]>(),
  studioList: Yup.array<Studio[]>(),
  genreIdList: Yup.array<Genre['id'][]>(),
  genreList: Yup.array<Genre[]>(),
  youtubeTrailerId: Yup.string().nullable(),
  source: Yup.mixed<Source>().oneOf(Object.values(Source))
    .required(ERROR_MESSAGES.requiredSource),
  season: Yup.mixed<Season>().oneOf(Object.values(Season))
    .required(ERROR_MESSAGES.requiredSeason),
  rating: Yup.mixed<Rating>().oneOf(Object.values(Rating))
    .required(ERROR_MESSAGES.requiredRating),
});

export const defaultAnimeFormValues: AnimeDetailPost = {
  image: '',
  englishTitle: '',
  japaneseTitle: '',
  aired: {
    start: null,
    end: null,
  } as DateRange,
  type: AnimeType.Tv,
  status: AnimeStatus.NotYetAired,
  synopsis: '',
  airing: false,
  studioIdList: [],
  studioList: [],
  genreIdList: [],
  genreList: [],
  youtubeTrailerId: null,
  source: Source.Unknown,
  season: Season.NonSeasonal,
  rating: Rating.Unknown,
};
