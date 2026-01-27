import { handleEngine, drive } from '@services/engine-service';
import {
  BASE_URL,
  ENDPOINTS,
  ERROR_MSG,
  STATUS_CODES,
} from '@services/constants';
import { isEngineDto, isDriveDto } from '@/types/type-guards';
import { EngineError } from '@/utils/custom-errors';
import type { EngineDto, DriveDto } from '@/types/type';

jest.mock('@/types/type-guards', () => ({
  isEngineDto: jest.fn(),
  isDriveDto: jest.fn(),
}));

const mockIsEngineDto = jest.mocked(isEngineDto);
const mockIsDriveDto = jest.mocked(isDriveDto);

describe('EngineService', () => {
  const createMockResponse = (
    data: unknown,
    options: { ok?: boolean; status?: number } = {}
  ): Response => {
    const { ok = true, status = 200 } = options;
    return {
      ok,
      status,
      json: jest.fn().mockResolvedValue(data),
    } as unknown as Response;
  };

  const mockEngineDto: EngineDto = { velocity: 100, distance: 500000 };
  const mockDriveDto: DriveDto = { success: true };

  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    mockIsEngineDto.mockReturnValue(true);
    mockIsDriveDto.mockReturnValue(true);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('handleEngine', () => {
    describe('when request is successful', () => {
      it('should return engine data for started status', async () => {
        const mockResponse = createMockResponse(mockEngineDto);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await handleEngine(1, 'started');

        expect(result).toEqual(mockEngineDto);
      });

      it('should return engine data for stopped status', async () => {
        const mockResponse = createMockResponse(mockEngineDto);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await handleEngine(1, 'stopped');

        expect(result).toEqual(mockEngineDto);
      });

      it('should call correct endpoint with id and status', async () => {
        const mockResponse = createMockResponse(mockEngineDto);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await handleEngine(42, 'started');

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}${ENDPOINTS.ENGINE}?id=42&status=started`,
          { method: 'PATCH' }
        );
      });

      it('should validate response using isEngineDto', async () => {
        const mockResponse = createMockResponse(mockEngineDto);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await handleEngine(1, 'started');

        expect(mockIsEngineDto).toHaveBeenCalledWith(mockEngineDto);
      });
    });

    describe('when request fails', () => {
      it('should log BAD_REQUEST error for 400 status', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.BAD_REQUEST,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await handleEngine(1, 'started');

        expect(consoleErrorSpy).toHaveBeenCalledWith(ERROR_MSG.BAD_REQUEST);
      });

      it('should log NOT_FOUND.CAR error for 404 status', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.NOT_FOUND,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await handleEngine(999, 'started');

        expect(consoleErrorSpy).toHaveBeenCalledWith(ERROR_MSG.NOT_FOUND.CAR);
      });

      it('should log generic error for other status codes', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await handleEngine(1, 'started');

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          `Response status: ${STATUS_CODES.INTERNAL_SERVER_ERROR}`
        );
      });

      it('should return undefined when response format is invalid', async () => {
        mockIsEngineDto.mockReturnValue(false);
        const mockResponse = createMockResponse({ invalid: 'data' });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await handleEngine(1, 'started');

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid response format');
      });

      it('should return undefined on network error', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

        const result = await handleEngine(1, 'started');

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Network error');
      });
    });
  });

  describe('drive', () => {
    let abortController: AbortController;

    beforeEach(() => {
      abortController = new AbortController();
    });

    describe('when request is successful', () => {
      it('should return drive result', async () => {
        const mockResponse = createMockResponse(mockDriveDto);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await drive(1, abortController.signal);

        expect(result).toEqual(mockDriveDto);
      });

      it('should call correct endpoint with id and drive status', async () => {
        const mockResponse = createMockResponse(mockDriveDto);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await drive(42, abortController.signal);

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}${ENDPOINTS.ENGINE}?id=42&status=drive`,
          { method: 'PATCH', signal: abortController.signal }
        );
      });

      it('should validate response using isDriveDto', async () => {
        const mockResponse = createMockResponse(mockDriveDto);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await drive(1, abortController.signal);

        expect(mockIsDriveDto).toHaveBeenCalledWith(mockDriveDto);
      });
    });

    describe('when request fails', () => {
      it('should log BAD_REQUEST error for 400 status', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.BAD_REQUEST,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await drive(1, abortController.signal);

        expect(consoleErrorSpy).toHaveBeenCalledWith(ERROR_MSG.BAD_REQUEST);
      });

      it('should log NOT_FOUND.ENGINE error for 404 status', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.NOT_FOUND,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await drive(1, abortController.signal);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          ERROR_MSG.NOT_FOUND.ENGINE
        );
      });

      it('should log TOO_MANY_REQUESTS error for 429 status', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.TOO_MANY_REQUESTS,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await drive(1, abortController.signal);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          ERROR_MSG.TOO_MANY_REQUESTS
        );
      });

      it('should log error and throw EngineError for 500 status', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await expect(drive(1, abortController.signal)).rejects.toThrow(
          EngineError
        );
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          ERROR_MSG.INTERNAL_SERVER_ERROR.ENGINE
        );
      });

      it('should return undefined when response format is invalid', async () => {
        mockIsDriveDto.mockReturnValue(false);
        const mockResponse = createMockResponse({ invalid: 'data' });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await drive(1, abortController.signal);

        expect(result).toBeUndefined();
      });

      it('should handle abort signal', async () => {
        const abortError = new Error('Aborted');
        abortError.name = 'AbortError';
        global.fetch = jest.fn().mockRejectedValue(abortError);

        const result = await drive(1, abortController.signal);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Aborted');
      });
    });
  });
});
