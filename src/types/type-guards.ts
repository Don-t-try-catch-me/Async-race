import type { CarDto, DriveDto, EngineDto, WinnerDto } from './type';

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

export function isWinnersArray(data: unknown): data is WinnerDto[] {
  return Array.isArray(data);
}

export function isWinnerDto(item: unknown): item is WinnerDto {
  return (
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'wins' in item &&
    'time' in item &&
    typeof item.id === 'number' &&
    typeof item.wins === 'number' &&
    typeof item.time === 'number'
  );
}

export function isEngineDto(item: unknown): item is EngineDto {
  return (
    typeof item === 'object' &&
    item !== null &&
    'velocity' in item &&
    'distance' in item &&
    typeof item.velocity === 'number' &&
    typeof item.distance === 'number'
  );
}

export function isDriveDto(item: unknown): item is DriveDto {
  return (
    typeof item === 'object' &&
    item !== null &&
    'success' in item &&
    typeof item.success === 'boolean'
  );
}
