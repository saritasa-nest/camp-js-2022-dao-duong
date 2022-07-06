import { AiredDto } from '../dtos/aired.dto';
import { Aired } from '../models/aired';

export namespace AiredMapper {

  /**
   * Maps dto to model.
   * @param dto Aired dto.
   */
  export function fromDto(dto: AiredDto): Aired {
    return new Aired({
      start: dto.start,
      end: dto.end,
    });
  }
}
