import {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
} from '@services/car-service';
import {
  BASE_URL,
  ENDPOINTS,
  ERROR_MSG,
  STATUS_CODES,
} from '@services/constants';
import { isCarDto, isCarsArray } from '@/types/type-guards';
import { CARS_LIST_ROWS_PER_PAGE } from '@/constants/constants';
import type { CarDto } from '@/types/type';

jest.mock('@/types/type-guards', () => ({
  isCarDto: jest.fn(),
  isCarsArray: jest.fn(),
}));

const mockIsCarDto = jest.mocked(isCarDto);
const mockIsCarsArray = jest.mocked(isCarsArray);

describe('CarService', () => {
  const createMockCar = (overrides?: Partial<CarDto>): CarDto => ({
    id: 1,
    name: 'Tesla Model S',
    color: '#ff0000',
    ...overrides,
  });

  const createMockCarsArray = (count: number = 3): CarDto[] =>
    Array.from({ length: count }, (_, i) =>
      createMockCar({ id: i + 1, name: `Car ${i + 1}` })
    );

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
      headers: {
        get: (name: string) => headers[name] ?? null,
      },
      json: jest.fn().mockResolvedValue(data),
    } as unknown as Response;
  };

  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    mockIsCarDto.mockReturnValue(true);
    mockIsCarsArray.mockReturnValue(true);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('getCars', () => {
    const mockCars = createMockCarsArray(3);

    describe('when request is successful', () => {
      it('should return cars array with total count from header', async () => {
        const totalCount = 42;
        const mockResponse = createMockResponse(mockCars, {
          headers: { 'X-Total-Count': String(totalCount) },
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await getCars();

        expect(result).toEqual({
          items: mockCars,
          totalCount,
        });
      });

      it('should use default pagination parameters when not provided', async () => {
        const mockResponse = createMockResponse(mockCars, {
          headers: { 'X-Total-Count': '10' },
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await getCars();

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}${ENDPOINTS.GARAGE}/?_page=1&_limit=${CARS_LIST_ROWS_PER_PAGE}`
        );
      });

      it('should pass custom pagination parameters to request', async () => {
        const page = 3;
        const limit = 20;
        const mockResponse = createMockResponse(mockCars, {
          headers: { 'X-Total-Count': '100' },
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await getCars(page, limit);

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}${ENDPOINTS.GARAGE}/?_page=${page}&_limit=${limit}`
        );
      });

      it('should return totalCount as 0 when X-Total-Count header is missing', async () => {
        const mockResponse = createMockResponse(mockCars, {
          headers: {},
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await getCars();

        expect(result?.totalCount).toBe(0);
      });

      it('should validate response using isCarsArray type guard', async () => {
        const mockResponse = createMockResponse(mockCars, {
          headers: { 'X-Total-Count': '3' },
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await getCars();

        expect(mockIsCarsArray).toHaveBeenCalledWith(mockCars);
      });
    });

    describe('when request fails', () => {
      it('should return undefined and log error when response is not ok', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await getCars();

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalled();
      });

      it('should return undefined and log error when response format is invalid', async () => {
        mockIsCarsArray.mockReturnValue(false);
        const mockResponse = createMockResponse(
          { invalid: 'data' },
          {
            headers: { 'X-Total-Count': '1' },
          }
        );
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await getCars();

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid response format');
      });

      it('should return undefined when fetch throws network error', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

        const result = await getCars();

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Network error');
      });
    });
  });

  describe('getCar', () => {
    const mockCar = createMockCar();

    describe('when car exists', () => {
      it('should return car data for valid id', async () => {
        const mockResponse = createMockResponse(mockCar);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await getCar(1);

        expect(result).toEqual(mockCar);
      });

      it('should call correct endpoint with car id', async () => {
        const carId = 42;
        const mockResponse = createMockResponse(mockCar);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await getCar(carId);

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}${ENDPOINTS.GARAGE}/${carId}`
        );
      });

      it('should validate response using isCarDto type guard', async () => {
        const mockResponse = createMockResponse(mockCar);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await getCar(1);

        expect(mockIsCarDto).toHaveBeenCalledWith(mockCar);
      });
    });

    describe('when car does not exist', () => {
      it('should return undefined and log specific error message for 404', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.NOT_FOUND,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await getCar(999);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith(ERROR_MSG.NOT_FOUND.CAR);
      });

      it('should return undefined without specific message for non-404 errors', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await getCar(1);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).not.toHaveBeenCalledWith(
          ERROR_MSG.NOT_FOUND.CAR
        );
      });
    });

    describe('when response format is invalid', () => {
      it('should return undefined when isCarDto returns false', async () => {
        mockIsCarDto.mockReturnValue(false);
        const mockResponse = createMockResponse({ invalid: 'data' });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await getCar(1);

        expect(result).toBeUndefined();
      });
    });
  });

  describe('createCar', () => {
    const newCarDto = { name: 'New Tesla', color: '#00ff00' };
    const createdCar = createMockCar({ ...newCarDto, id: 10 });

    describe('when creation is successful', () => {
      it('should return created car with id', async () => {
        const mockResponse = createMockResponse(createdCar);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await createCar(newCarDto);

        expect(result).toEqual(createdCar);
      });

      it('should send POST request with correct headers and body', async () => {
        const mockResponse = createMockResponse(createdCar);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await createCar(newCarDto);

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${ENDPOINTS.GARAGE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCarDto),
        });
      });

      it('should validate response using isCarDto type guard', async () => {
        const mockResponse = createMockResponse(createdCar);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await createCar(newCarDto);

        expect(mockIsCarDto).toHaveBeenCalledWith(createdCar);
      });
    });

    describe('when creation fails', () => {
      it('should return undefined and log error when response is not ok', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.BAD_REQUEST,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await createCar(newCarDto);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalled();
      });

      it('should return undefined when response format is invalid', async () => {
        mockIsCarDto.mockReturnValue(false);
        const mockResponse = createMockResponse({ invalid: 'data' });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await createCar(newCarDto);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid response format');
      });
    });
  });

  describe('deleteCar', () => {
    describe('when deletion is successful', () => {
      it('should return true', async () => {
        const mockResponse = createMockResponse(null);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await deleteCar(1);

        expect(result).toBe(true);
      });

      it('should send DELETE request to correct endpoint', async () => {
        const carId = 42;
        const mockResponse = createMockResponse(null);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await deleteCar(carId);

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}${ENDPOINTS.GARAGE}/${carId}`,
          { method: 'DELETE' }
        );
      });
    });

    describe('when deletion fails', () => {
      it('should return undefined and log specific error for 404', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.NOT_FOUND,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await deleteCar(999);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith(ERROR_MSG.NOT_FOUND.CAR);
      });

      it('should return undefined without specific message for non-404 errors', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await deleteCar(1);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).not.toHaveBeenCalledWith(
          ERROR_MSG.NOT_FOUND.CAR
        );
      });
    });
  });

  describe('updateCar', () => {
    const carToUpdate: CarDto = {
      id: 1,
      name: 'Updated Tesla',
      color: '#0000ff',
    };

    describe('when update is successful', () => {
      it('should return updated car data', async () => {
        const mockResponse = createMockResponse(carToUpdate);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await updateCar(carToUpdate);

        expect(result).toEqual(carToUpdate);
      });

      it('should send PUT request with correct headers and body (without id in body)', async () => {
        const mockResponse = createMockResponse(carToUpdate);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await updateCar(carToUpdate);

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}${ENDPOINTS.GARAGE}/${carToUpdate.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: carToUpdate.name,
              color: carToUpdate.color,
            }),
          }
        );
      });

      it('should validate response using isCarDto type guard', async () => {
        const mockResponse = createMockResponse(carToUpdate);
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        await updateCar(carToUpdate);

        expect(mockIsCarDto).toHaveBeenCalledWith(carToUpdate);
      });
    });

    describe('when update fails', () => {
      it('should return undefined and log specific error for 404', async () => {
        const mockResponse = createMockResponse(null, {
          ok: false,
          status: STATUS_CODES.NOT_FOUND,
        });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await updateCar(carToUpdate);

        expect(result).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith(ERROR_MSG.NOT_FOUND.CAR);
      });

      it('should return undefined when response format is invalid', async () => {
        mockIsCarDto.mockReturnValue(false);
        const mockResponse = createMockResponse({ invalid: 'data' });
        global.fetch = jest.fn().mockResolvedValue(mockResponse);

        const result = await updateCar(carToUpdate);

        expect(result).toBeUndefined();
      });
    });
  });
});
