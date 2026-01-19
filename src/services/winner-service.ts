import type { SortKey, SortOrder, WinnerDto } from '@/types/type';
import { BASE_URL, ENDPOINTS, ERROR_MSG, STATUS_CODES } from './constants';
import { WINNER_TABLE_ROWS_PER_PAGE } from '@/constants/constants';
import { isWinnerDto, isWinnersArray } from '@/types/type-guards';

export async function getWinners(
  page: number = 1,
  limit: number = WINNER_TABLE_ROWS_PER_PAGE,
  sortBy: SortKey = 'id',
  sortOrder: SortOrder = 'asc'
) {
  try {
    const response = await fetch(
      BASE_URL +
        ENDPOINTS.WINNERS +
        `/?_page=${page}&_limit=${limit}&_sort=${sortBy}&_order=${sortOrder}`
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result: unknown = await response.json();
    if (!isWinnersArray(result)) {
      throw new Error('Invalid response format');
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export async function getWinner(id: number) {
  let status = 200;
  try {
    const response = await fetch(BASE_URL + ENDPOINTS.WINNERS + `/${id}`);

    if (!response.ok) {
      status = response.status;
      throw new Error(`Response status: ${response.status}`);
    }

    const result: unknown = await response.json();
    if (!isWinnerDto(result)) {
      throw new Error('Invalid response format');
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      if (status === STATUS_CODES.NOT_FOUND) {
        console.error(ERROR_MSG.NOT_FOUND.WINNER);
      } else {
        console.error(error.message);
      }
    }
  }
}

export async function createWinner(dto: WinnerDto) {
  let status = 201;
  try {
    const response = await fetch(BASE_URL + ENDPOINTS.WINNERS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      status = response.status;
      throw new Error(`Response status: ${response.status}`);
    }

    const result: unknown = await response.json();
    if (!isWinnerDto(result)) {
      throw new Error('Invalid response format');
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      if (status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        console.error(ERROR_MSG.INTERNAL_SERVER_ERROR.WINNER);
      } else {
        console.error(error.message);
      }
    }
  }
}

export async function deleteWinner(id: number) {
  let status = 200;
  try {
    const response = await fetch(BASE_URL + ENDPOINTS.WINNERS + `/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      status = response.status;
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      if (status === STATUS_CODES.NOT_FOUND) {
        console.error(ERROR_MSG.NOT_FOUND.WINNER);
      } else {
        console.error(error.message);
      }
    }
  }
}

export async function updateWinner({ id, wins, time }: WinnerDto) {
  let status = 200;
  try {
    const response = await fetch(BASE_URL + ENDPOINTS.WINNERS + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wins, time }),
    });

    if (!response.ok) {
      status = response.status;
      throw new Error(`Response status: ${response.status}`);
    }

    const result: unknown = await response.json();
    if (!isWinnerDto(result)) {
      throw new Error('Invalid response format');
    }
    return result;
  } catch (error) {
    if (error instanceof Error && status === STATUS_CODES.NOT_FOUND) {
      console.error(ERROR_MSG.NOT_FOUND.WINNER);
    }
  }
}
