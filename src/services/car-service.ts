import type { CarDto } from '@/types/type';
import { BASE_URL, ENDPOINTS, ERROR_MSG, STATUS_CODES } from './constants';
import { isCarDto, isCarsArray } from '@/types/type-guards';

export async function getCars() {
  try {
    const response = await fetch(BASE_URL + ENDPOINTS.GARAGE);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result: unknown = await response.json();
    if (!isCarsArray(result)) {
      throw new Error('Invalid response format');
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export async function getCar(id: number) {
  let status = 200;
  try {
    const response = await fetch(BASE_URL + ENDPOINTS.GARAGE + `/:${id}`);
    if (!response.ok) {
      status = response.status;
      throw new Error(`Response status: ${response.status}`);
    }
    const result: unknown = await response.json();
    if (!isCarDto(result)) {
      throw new Error('Invalid response format');
    }
    return result;
  } catch (error) {
    if (error instanceof Error && status === STATUS_CODES.NOT_FOUND) {
      console.error(ERROR_MSG.NOT_FOUND.CAR);
    }
  }
}

export async function createCar(dto: Omit<CarDto, 'id'>) {
  try {
    const response = await fetch(BASE_URL + ENDPOINTS.GARAGE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result: unknown = await response.json();
    if (!isCarDto(result)) {
      throw new Error('Invalid response format');
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
