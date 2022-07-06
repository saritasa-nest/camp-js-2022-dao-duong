/** Aired DTO. */
interface AiredDto {

  /** Anime start date. */
  readonly start: string;

  /** Anime end date. */
  readonly end: string;
}

/** Anime DTO. */
export interface AnimeDto {

  /** Id. */
  readonly id: number;

  /** Creation time, for example, "2014-12-20T17:30:50.416Z". */
  readonly created: string;

  /** Time of the last modification, for example, "2014-12-20T17:30:50.416Z". */
  readonly modified: string;

  /** Anime English title. */
  readonly title_eng: string;

  /** Anime Japanese title. */
  readonly title_jpn: string;

  /** Anime image. */
  readonly image: string;

  /** Anime aired date. */
  readonly aired: AiredDto;

  /** Anime Status. */
  readonly status: string;

  /** Anime type. */
  readonly type: 'GENRES';
}
