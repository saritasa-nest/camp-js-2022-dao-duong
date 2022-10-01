import { StudioDto } from '@js-camp/core/dtos/anime/studio.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { StudioMapper } from '@js-camp/core/mappers/anime/studio.mapper';
import { Studio } from '@js-camp/core/models/anime';

import { http } from '..';

export namespace StudiosService {
  const studiosPath = '/anime/studios/';

  /** Fetch studios data. */
  export async function fetchStudios(): Promise<Studio[]> {
    const studiosResponse = await http.get<PaginationDto<StudioDto>>(
      studiosPath,
    );

    const totalStudios = await http.get<PaginationDto<StudioDto>>(studiosPath, {
      params: { limit: studiosResponse.data.count },
    });
    return totalStudios.data.results.map(studiosDto =>
      StudioMapper.fromDto(studiosDto));
  }

  /**
   * Add new studio.
   * @param studioName Studio name.
   */
  export async function addStudio(studioName: Studio['name']): Promise<Studio> {
    const { data } = await http.post<StudioDto>(studiosPath, {
      name: studioName,
    });
    return StudioMapper.fromDto(data);
  }
}
