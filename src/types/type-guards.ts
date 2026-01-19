import type { CarDto } from './type';

export function isCarsArray(data: unknown): data is CarDto[] {
  return Array.isArray(data) && data.every((item) => isCarDto(item));
}

export function isCarDto(item: unknown): item is CarDto {
  return (
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'name' in item &&
    'color' in item &&
    typeof item.id === 'number' &&
    typeof item.name === 'string' &&
    typeof item.color === 'string'
  );
}
