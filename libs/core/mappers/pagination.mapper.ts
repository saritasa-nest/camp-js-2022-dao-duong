import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';
export namespace PaginationMapper {

  /**
   * Maps dto to model.
   * @param dto Pagination dto.
   * @param mapperFromDto Callback of result mapper from DTO to Model.
   */
  export function fromDto<Dto, Model>(dto: PaginationDto<Dto>, mapperFromDto: (resultDto: Dto) => Model): Pagination<Model> {
    return new Pagination<Model>({
      count: dto.count,
      next: dto.next,
      previous: dto.previous,
      results: dto.results.map(result => mapperFromDto(result)),
    });
  }
}