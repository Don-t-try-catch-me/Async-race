import { getTotalPages, clampPage } from '@/utils/pagination';

describe('pagination utils', () => {
  describe('getTotalPages', () => {
    test('returns 1 when totalItems is 0', () => {
      expect(getTotalPages(0, 10)).toBe(1);
    });

    test('returns 1 when totalItems is negative', () => {
      expect(getTotalPages(-5, 10)).toBe(1);
    });

    test('calculates pages using Math.ceil', () => {
      expect(getTotalPages(1, 10)).toBe(1);
      expect(getTotalPages(10, 10)).toBe(1);
      expect(getTotalPages(11, 10)).toBe(2);
      expect(getTotalPages(20, 10)).toBe(2);
      expect(getTotalPages(21, 10)).toBe(3);
    });

    test('treats perPage <= 0 as 1', () => {
      expect(getTotalPages(3, 0)).toBe(3);
      expect(getTotalPages(3, -10)).toBe(3);
    });

    test('returns at least 1 even for weird inputs', () => {
      expect(getTotalPages(0, 0)).toBe(1);
      expect(getTotalPages(-1, 0)).toBe(1);
    });
  });

  describe('clampPage', () => {
    test('clamps page below 1 to 1', () => {
      expect(clampPage(0, 5)).toBe(1);
      expect(clampPage(-10, 5)).toBe(1);
    });

    test('returns page when it is within range', () => {
      expect(clampPage(1, 5)).toBe(1);
      expect(clampPage(3, 5)).toBe(3);
      expect(clampPage(5, 5)).toBe(5);
    });

    test('clamps page above totalPages to totalPages', () => {
      expect(clampPage(6, 5)).toBe(5);
      expect(clampPage(100, 5)).toBe(5);
    });

    test('treats totalPages <= 0 as 1', () => {
      expect(clampPage(1, 0)).toBe(1);
      expect(clampPage(2, 0)).toBe(1);
      expect(clampPage(999, -10)).toBe(1);
      expect(clampPage(0, -10)).toBe(1);
    });
  });
});
