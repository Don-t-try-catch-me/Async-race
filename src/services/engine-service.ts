import type { EngineStatus } from '@/types/type';
import { BASE_URL, ENDPOINTS, ERROR_MSG, STATUS_CODES } from './constants';
import { isDriveDto, isEngineDto } from '@/types/type-guards';
import { EngineError } from '@/utils/custom-errors';

export async function handleEngine(id: number, engineStatus: EngineStatus) {
  let status = 200;
  try {
    const response = await fetch(
      BASE_URL + ENDPOINTS.ENGINE + `?id=${id}&status=${engineStatus}`,
      {
        method: 'PATCH',
      }
    );
    if (!response.ok) {
      status = response.status;
      throw new Error(`Response status: ${response.status}`);
    }
    const result: unknown = await response.json();
    if (!isEngineDto(result)) {
      throw new Error('Invalid response format');
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      switch (status) {
        case STATUS_CODES.BAD_REQUEST: {
          console.error(ERROR_MSG.BAD_REQUEST);
          break;
        }
        case STATUS_CODES.NOT_FOUND: {
          console.error(ERROR_MSG.NOT_FOUND.CAR);
          break;
        }
        default: {
          console.error(error.message);
        }
      }
    }
  }
}

export async function drive(id: number, signal: AbortSignal) {
  let status = 200;
  try {
    const response = await fetch(
      BASE_URL + ENDPOINTS.ENGINE + `?id=${id}&status=drive`,
      {
        method: 'PATCH',
        signal,
      }
    );

    if (!response.ok) {
      status = response.status;
      throw new Error(`Response status: ${response.status}`);
    }

    const result: unknown = await response.json();
    if (!isDriveDto(result)) {
      throw new Error('Invalid response format');
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      switch (status) {
        case STATUS_CODES.BAD_REQUEST: {
          console.error(ERROR_MSG.BAD_REQUEST);
          break;
        }
        case STATUS_CODES.NOT_FOUND: {
          console.error(ERROR_MSG.NOT_FOUND.ENGINE);
          break;
        }
        case STATUS_CODES.TOO_MANY_REQUESTS: {
          console.error(ERROR_MSG.TOO_MANY_REQUESTS);
          break;
        }
        case STATUS_CODES.INTERNAL_SERVER_ERROR: {
          console.error(ERROR_MSG.INTERNAL_SERVER_ERROR.ENGINE);
          throw new EngineError();
        }
        default: {
          console.error(error.message);
        }
      }
    }
  }
}
