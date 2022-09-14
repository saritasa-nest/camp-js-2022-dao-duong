
import { GenreDto } from '@js-camp/core/dtos/anime/genre.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { GenreMapper } from '@js-camp/core/mappers/anime/genre.mapper';
import { Genre } from '@js-camp/core/models/anime';

import { http } from '..';

export namespace GenresService {
  const genresPath = '/anime/genres/';

  /** Fetch genres data. */
  export async function fetchGenres(): Promise<Genre[]> {
    const genresResponse = await http.get<PaginationDto<GenreDto>>(genresPath);

    const totalGenres = await http.get<PaginationDto<GenreDto>>(genresPath, {
      params: { limit: genresResponse.data.count },
    });
    return totalGenres.data.results.map(genresDto =>
        GenreMapper.fromDto(genresDto));
  }

  /**
   * Add new genre.
   * @param genreName Genre name.
   */
  export async function addGenre(genreName: Genre['name']): Promise<Genre> {
    const { data } = await http.post<GenreDto>(genresPath, {
      name: genreName,
      type: 'GENRES',
    });
    return GenreMapper.fromDto(data);
  }
}
