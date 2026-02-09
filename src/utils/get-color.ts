import { COLORS } from '@/constants/cars-array';

export function getColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}
