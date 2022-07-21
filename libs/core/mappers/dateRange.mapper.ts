import { DateRangeDto } from '../dtos/dateRange.dto';
import { DateRange } from '../models/dateRange';

export namespace DateRangeMapper {

  /**
   * Maps dto to model.
   * @param dto DateRange dto.
   */
  export function fromDto(dto: DateRangeDto): DateRange {
    return new DateRange({
      start: new Date(dto.start),
      end: new Date(dto.end),
    });
  }
}
