import { DateRangeDto } from '../dtos/dateRange.dto';
import { DateRange } from '../models/dateRange';

export namespace DateRangeMapper {

  /**
   * Maps dto to model.
   * @param dto DateRange dto.
   */
  export function fromDto(dto: DateRangeDto): DateRange {
    return new DateRange({
      start: dto.start ? new Date(dto.start) : null,
      end: dto.end ? new Date(dto.end) : null,
    });
  }

  /**
   * Maps model to dto.
   * @param dateRange DateRange model.
   */
  export function toDto(dateRange: DateRange): DateRangeDto {
    return {
      start: dateRange.start ? dateRange.start.toISOString() : null,
      end: dateRange.end ? dateRange.end.toISOString() : null,
    };
  }
}
