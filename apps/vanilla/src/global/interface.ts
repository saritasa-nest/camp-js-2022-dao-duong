
interface IAnime {

  /** Count total anime. */
  count: number;

  /** Next set of results from the last result. */
  next: string | null;

  /** Previous set of results from the first result. */
  previous: string | null;

  /** Array of  anime. */
  results: {

    /** Anime id. */
    id: number;

    /** Anime created day. */
    created: Date;

    /** Anime modified day. */
    modified: Date;

    /** English title of the anime. */
    title_eng: string;

    /** Japanese title of the anime. */
    title_jpn: string;

    /** Anime image. */
    image: string;

    /** Anime air time. */
    aired: {

      /** Air start day. */
      start: string;

      /** Air end day. */
      end: string;
    };

    /** Anime type. */
    type: string;

    /** Anime status. */
    status: string;
  }[];
}
