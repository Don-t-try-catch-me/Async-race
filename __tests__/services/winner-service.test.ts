import {
  getWinners,
  getWinner,
  createWinner,
  deleteWinner,
  updateWinner,
  handleWinner,
} from '@services/winner-service';
import {
  BASE_URL,
  ENDPOINTS,
  ERROR_MSG,
  STATUS_CODES,
} from '@services/constants';
import { isWinnerDto, isWinnersArray } from '@/types/type-guards';
import { WINNER_TABLE_ROWS_PER_PAGE } from '@/constants/constants';
import type { WinnerDto } from '@/types/type';

jest.mock('@/types/type-guards', () => ({
  isWinnerDto: jest.fn(),
  isWinnersArray: jest.fn(),
}));

const mockIsWinnerDto = jest.mocked(isWinnerDto);
const mockIsWinnersArray = jest.mocked(isWinnersArray);

describe('WinnerService', () => {
  const createMockResponse = (
    data: unknown,
    options: {
      ok?: boolean;
      status?: number;
      headers?: Record<string, string>;
    } = {}
  ): Response => {
    const { ok = true, status = 200, headers = {} } = options;
    return {
      ok,
      status,
      headers: { get: (name: string) => headers[name] ?? null },
      json: jest.fn().mockResolvedValue(data),
    } as unknown as Response;
  };

  const createMockWinner = (overrides?: Partial<WinnerDto>): WinnerDto => ({
    id: 1,
    wins: 5,
    time: 12.5,
    ...overrides,
  });

  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    mockIsWinnerDto.mockReturnValue(true);
    mockIsWinnersArray.mockReturnValue(true);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('getWinners', () => {
    const mockWinners = [createMockWinner(), createMockWinner({ id: 2 })];

    describe('when request is successful', () => {
      it('should return winners array with total count', async () => {
        const mockResponse = createMockResponse(mockWinners, {
          headers: { 'X-Total-Count': '10' },
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await getWinners();

        expect(result).toEqual({ items: mockWinners, totalCount: 10 });
      });

      it('should use default parameters', async () => {
        const mockResponse = createMockResponse(mockWinners, {
          headers: { 'X-Total-Count': '10' },
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await getWinners();

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}${ENDPOINTS.WINNERS}/?_page=1&_limit=${WINNER_TABLE_ROWS_PER_PAGE}&_sort=id&_order=ASC`
        );
      });

      it('should pass custom parameters with uppercase sort order', async () => {
        const mockResponse = createMockResponse(mockWinners, {
          headers: { 'X-Total-Count': '100' },
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await getWinners(2, 20, 'wins', 'desc');

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}${ENDPOINTS.WINNERS}/?_page=2&_limit=20&_sort=wins&_order=DESC`
        );
      });

      it('should return totalCount as 0 when header is missing', async () => {
        const mockResponse = createMockResponse(mockWinners, { headers: {} });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await getWinners();

        expect(result?.totalCount).toBe(0);
      });
    });

    describe('when request fails', () => {
      it('should return undefined and log error when response is not ok', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: 500,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await getWinners();

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalled();
      });

      it('should return undefined when response format is invalid', async () => {
        mockIsWinnersArray.mockReturnValue(false);
        const mockResponse = createMockResponse(
          { invalid: 'data' },
          {
            headers: { 'X-Total-Count': '1' },
          }
        );
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await getWinners();

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid response format');
      });
    });
  });

  describe('getWinner', () => {
    const mockWinner = createMockWinner();

    describe('when winner exists', () => {
      it('should return winner data', async () => {
        const mockResponse = createMockResponse(mockWinner);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await getWinner(1);

        expect(result).toEqual(mockWinner);
      });

      it('should call correct endpoint', async () => {
        const mockResponse = createMockResponse(mockWinner);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await getWinner(42);

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}${ENDPOINTS.WINNERS}/42`
        );
      });
    });

    describe('when winner does not exist', () => {
      it('should log specific error for 404', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.NOT_FOUND,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await getWinner(999);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          ERROR_MSG.NOT_FOUND.WINNER
        );
      });

      it('should log generic error for other status codes', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: 500,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await getWinner(1);

        expect(consoleErrorSpy).toHaveBeenCalledWith('Response status: 500');
      });
    });
  });

  describe('createWinner', () => {
    const newWinner: WinnerDto = { id: 1, wins: 1, time: 10.5 };

    describe('when creation is successful', () => {
      it('should return created winner', async () => {
        const mockResponse = createMockResponse(newWinner);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await createWinner(newWinner);

        expect(result).toEqual(newWinner);
      });

      it('should send POST request with correct body', async () => {
        const mockResponse = createMockResponse(newWinner);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await createWinner(newWinner);

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${ENDPOINTS.WINNERS}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newWinner),
        });
      });
    });

    describe('when creation fails', () => {
      it('should log specific error for 500 (duplicate id)', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await createWinner(newWinner);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          ERROR_MSG.INTERNAL_SERVER_ERROR.WINNER
        );
      });

      it('should log generic error for other status codes', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: 400,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await createWinner(newWinner);

        expect(consoleErrorSpy).toHaveBeenCalledWith('Response status: 400');
      });
    });
  });

  describe('deleteWinner', () => {
    describe('when deletion is successful', () => {
      it('should complete without error', async () => {
        const mockResponse = createMockResponse(null);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await expect(deleteWinner(1)).resolves.not.toThrow();
      });

      it('should send DELETE request to correct endpoint', async () => {
        const mockResponse = createMockResponse(null);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await deleteWinner(42);

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}${ENDPOINTS.WINNERS}/42`,
          {
            method: 'DELETE',
          }
        );
      });
    });

    describe('when deletion fails', () => {
      it('should log specific error for 404', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.NOT_FOUND,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await deleteWinner(999);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          ERROR_MSG.NOT_FOUND.WINNER
        );
      });
    });
  });

  describe('updateWinner', () => {
    const winnerToUpdate: WinnerDto = { id: 1, wins: 10, time: 8.5 };

    describe('when update is successful', () => {
      it('should return updated winner', async () => {
        const mockResponse = createMockResponse(winnerToUpdate);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await updateWinner(winnerToUpdate);

        expect(result).toEqual(winnerToUpdate);
      });

      it('should send PUT request with body without id', async () => {
        const mockResponse = createMockResponse(winnerToUpdate);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await updateWinner(winnerToUpdate);

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}${ENDPOINTS.WINNERS}/1`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wins: 10, time: 8.5 }),
          }
        );
      });
    });

    describe('when update fails', () => {
      it('should log specific error for 404', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.NOT_FOUND,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await updateWinner(winnerToUpdate);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          ERROR_MSG.NOT_FOUND.WINNER
        );
      });
    });
  });

  describe('handleWinner', () => {
    describe('when winner already exists', () => {
      it('should update existing winner with incremented wins', async () => {
        const existingWinner = createMockWinner({ id: 1, wins: 5, time: 10.0 });
        const getResponse = createMockResponse(existingWinner);
        const updateResponse = createMockResponse({
          id: 1,
          wins: 6,
          time: 9.0,
        });

        global.fetch = jest
          .fn()
          .mockResolvedValueOnce(getResponse)
          .mockResolvedValueOnce(updateResponse);

        await handleWinner({ id: 1, time: 9.0 });

        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenLastCalledWith(
          `${BASE_URL}${ENDPOINTS.WINNERS}/1`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wins: 6, time: 9.0 }),
          }
        );
      });

      it('should keep existing time if it is better than new time', async () => {
        const existingWinner = createMockWinner({ id: 1, wins: 5, time: 8.0 });
        const getResponse = createMockResponse(existingWinner);
        const updateResponse = createMockResponse({
          id: 1,
          wins: 6,
          time: 8.0,
        });

        global.fetch = jest
          .fn()
          .mockResolvedValueOnce(getResponse)
          .mockResolvedValueOnce(updateResponse);

        await handleWinner({ id: 1, time: 12.0 });

        expect(fetch).toHaveBeenLastCalledWith(
          `${BASE_URL}${ENDPOINTS.WINNERS}/1`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wins: 6, time: 8.0 }),
          }
        );
      });
    });

    describe('when winner does not exist', () => {
      it('should create new winner with wins = 1', async () => {
        const getResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.NOT_FOUND,
        });
        const createResponse = createMockResponse({
          id: 1,
          wins: 1,
          time: 10.0,
        });

        global.fetch = jest
          .fn()
          .mockResolvedValueOnce(getResponse)
          .mockResolvedValueOnce(createResponse);

        await handleWinner({ id: 1, time: 10.0 });

        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenLastCalledWith(
          `${BASE_URL}${ENDPOINTS.WINNERS}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 1, time: 10.0, wins: 1 }),
          }
        );
      });
    });
  });
});
