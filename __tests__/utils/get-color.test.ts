import { getColor } from '@utils/get-color';
import { COLORS } from '@/constants/cars-array';

describe('getColor', () => {
  it('should return a string', () => {
    const result = getColor();

    expect(typeof result).toBe('string');
  });

  it('should return color from COLORS array', () => {
    const result = getColor();

    expect(COLORS).toContain(result);
  });

  it('should return first color when Math.random returns 0', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);

    const result = getColor();

    expect(result).toBe(COLORS[0]);

    jest.restoreAllMocks();
  });

  it('should return last color when Math.random returns 0.999', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.999);

    const result = getColor();

    expect(result).toBe(COLORS[COLORS.length - 1]);

    jest.restoreAllMocks();
  });
});
