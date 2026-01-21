import { CAR_BRANDS, CAR_MODELS } from '@/constants/cars-array';

export function getCarName() {
  const name =
    CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)] +
    ' ' +
    CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];

  return name;
}
