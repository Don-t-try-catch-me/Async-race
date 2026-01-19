import type { CarDto, WinnerDto } from '@/types/type';
import { carsMock } from './mocks-cars';
import { winnersMock } from './mocks-winners';

const carsById = new Map<number, CarDto>(carsMock.map((c) => [c.id, c]));

export function getWinnersMock(): Promise<WinnerDto[]> {
  return Promise.resolve(winnersMock);
}

export function getCarByIdMock(id: number): Promise<CarDto> {
  const car = carsById.get(id);
  if (!car) return Promise.reject(new Error(`Car not found: ${id}`));
  return Promise.resolve(car);
}
