import { AiredDto } from '../dtos/aired.dto';
import { DateRange } from '../models/dateRange';

export namespace AiredMapper {

  /**
   * Maps dto to model.
   * @param dto Aired dto.
   */
  export function fromDto(dto: AiredDto): DateRange {
    return new DateRange({
      start: dto.start,
      end: dto.end,
    });
  }
}
