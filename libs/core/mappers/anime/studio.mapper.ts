import { StudioDto } from '../../dtos/anime/studio.dto';
import { Studio } from '../../models/anime/studio';

export namespace StudioMapper {

  /**
   * Maps dto to model.
   * @param dto Studio dto.
   */
  export function fromDto(dto: StudioDto): Studio {
    return new Studio({
      id: dto.id,
      name: dto.name,
    });
  }
}
