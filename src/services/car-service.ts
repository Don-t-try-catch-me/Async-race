import type { CarDto } from '@/types/type';
import { BASE_URL, ENDPOINTS, ERROR_MSG, STATUS_CODES } from './constants';
import { isCarDto, isCarsArray } from '@/types/type-guards';
import { WINNER_TABLE_ROWS_PER_PAGE } from '@/constants/constants';

export async function getCars(
  page: number = 1,
  limit: number = WINNER_TABLE_ROWS_PER_PAGE
) {
  try {
    const response = await fetch(
      BASE_URL + ENDPOINTS.GARAGE + `/?_page=${page}&_limit=${limit}`
    );
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
    const response = await fetch(BASE_URL + ENDPOINTS.GARAGE + `/${id}`);
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

export async function deleteCar(id: number) {
  let status = 200;
  try {
    const response = await fetch(BASE_URL + ENDPOINTS.GARAGE + `/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      status = response.status;
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    if (error instanceof Error && status === STATUS_CODES.NOT_FOUND) {
      console.error(ERROR_MSG.NOT_FOUND.CAR);
    }
  }
}

export async function updateCar({ id, name, color }: CarDto) {
  let status = 200;
  try {
    const response = await fetch(BASE_URL + ENDPOINTS.GARAGE + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, color }),
    });

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
