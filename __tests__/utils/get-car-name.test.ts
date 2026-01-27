import { getCarName } from '@utils/get-car-name';
import { CAR_BRANDS, CAR_MODELS } from '@/constants/cars-array';

describe('getCarName', () => {
  it('should return a string', () => {
    const result = getCarName();

    expect(typeof result).toBe('string');
  });

  it('should return name in format "brand model"', () => {
    const result = getCarName();

    expect(result).toMatch(/^\S.+ \S.+$/);
  });

  it('should return brand from CAR_BRANDS array', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);

    const result = getCarName();
    const brand = result.split(' ')[0];

    expect(CAR_BRANDS).toContain(brand);

    jest.restoreAllMocks();
  });

  it('should return model from CAR_MODELS array', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);

    const result = getCarName();
    const parts = result.split(' ');
    const model = parts.slice(1).join(' ');

    expect(CAR_MODELS).toContain(model);

    jest.restoreAllMocks();
  });

  it('should return deterministic result when Math.random is mocked', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);

    const result = getCarName();

    expect(result).toBe(`${CAR_BRANDS[0]} ${CAR_MODELS[0]}`);

    jest.restoreAllMocks();
  });

  it('should return last brand and model when Math.random returns 0.999', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.999);

    const result = getCarName();
    const expectedBrand = CAR_BRANDS[CAR_BRANDS.length - 1];
    const expectedModel = CAR_MODELS[CAR_MODELS.length - 1];

    expect(result).toBe(`${expectedBrand} ${expectedModel}`);

    jest.restoreAllMocks();
  });
});
