import * as Yup from 'yup';
import { AnimeDetailPost, AnimeStatus, AnimeType, Genre, Studio } from '@js-camp/core/models/anime';
import { Rating, Season, Source } from '@js-camp/core/models/anime/';
import { DateRange } from '@js-camp/core/models/dateRange';

const REQUIRED_MESSAGE = 'This field is required!';

export const AnimeFormSchema = Yup.object().shape({
  image: Yup.string().nullable(),
  englishTitle: Yup.string().required(REQUIRED_MESSAGE),
  japaneseTitle: Yup.string().required(REQUIRED_MESSAGE),
  aired: Yup.object().shape({
    start: Yup.date().nullable()
      .required(REQUIRED_MESSAGE),
    end: Yup.date().nullable()
      .required(REQUIRED_MESSAGE),
  }),
  type: Yup.mixed<AnimeType>().oneOf(Object.values(AnimeType))
    .required(REQUIRED_MESSAGE),
  status: Yup.mixed<AnimeStatus>().oneOf(Object.values(AnimeStatus))
    .required(REQUIRED_MESSAGE),
  synopsis: Yup.string().required(REQUIRED_MESSAGE)
    .required(REQUIRED_MESSAGE),
  airing: Yup.boolean().required(REQUIRED_MESSAGE)
    .required(REQUIRED_MESSAGE),
  studioIdList: Yup.array<Studio['id'][]>(),
  studioList: Yup.array<Studio[]>().required(REQUIRED_MESSAGE),
  genreIdList: Yup.array<Genre['id'][]>(),
  genreList: Yup.array<Genre[]>().required(REQUIRED_MESSAGE),
  youtubeTrailerId: Yup.string().nullable(),
  source: Yup.mixed<Source>().oneOf(Object.values(Source))
    .required(REQUIRED_MESSAGE),
  season: Yup.mixed<Season>().oneOf(Object.values(Season))
    .required(REQUIRED_MESSAGE),
  rating: Yup.mixed<Rating>().oneOf(Object.values(Rating))
    .required(REQUIRED_MESSAGE),
});

export const defaultAnimeFormValues: AnimeDetailPost = {
  image: null,
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
