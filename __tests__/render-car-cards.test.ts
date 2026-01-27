import { RenderCarCards } from '@/components/car-card-list/car-card-list-render';
import { CreateCarCard } from '@/components/car-card/car-card';
import type { CarDto } from '@/types/type';

jest.mock('@/components/car-card/car-card', () => ({
  CreateCarCard: jest.fn(),
}));

const mockedCreateCarCard = jest.mocked(CreateCarCard);

function makeMockCard(id: number) {
  const root = document.createElement('li');
  root.className = 'car-card';
  root.dataset.carId = String(id);

  const controller = { id };
  const controls = {
    startBtn: document.createElement('button'),
    stopBtn: document.createElement('button'),
    editBtn: document.createElement('button'),
    removeBtn: document.createElement('button'),
  };

  return { root, carController: controller, controls };
}

describe('RenderCarCards', () => {
  beforeEach(() => {
    mockedCreateCarCard.mockReset();
  });

  test('clears container before rendering', () => {
    const container = document.createElement('ul');
    container.append(
      document.createElement('li'),
      document.createElement('li')
    );

    const cars: CarDto[] = [];
    RenderCarCards(container, cars);

    expect(container.children.length).toBe(0);
  });

  test('renders cards for provided cars and returns bundles', () => {
    const container = document.createElement('ul');

    const cars: CarDto[] = [
      { id: 1, name: 'Car 1', color: '#111111' },
      { id: 2, name: 'Car 2', color: '#222222' },
    ];

    mockedCreateCarCard
      .mockImplementationOnce(() => makeMockCard(1) as any)
      .mockImplementationOnce(() => makeMockCard(2) as any);

    const bundles = RenderCarCards(container, cars);

    expect(mockedCreateCarCard).toHaveBeenCalledTimes(2);
    expect(mockedCreateCarCard).toHaveBeenNthCalledWith(1, cars[0]);
    expect(mockedCreateCarCard).toHaveBeenNthCalledWith(2, cars[1]);

    expect(container.querySelectorAll('.car-card')).toHaveLength(2);
    expect(
      (container.querySelectorAll('.car-card')[0] as HTMLElement).dataset.carId
    ).toBe('1');
    expect(
      (container.querySelectorAll('.car-card')[1] as HTMLElement).dataset.carId
    ).toBe('2');

    expect(bundles).toHaveLength(2);
    expect(bundles[0]).toHaveProperty('controller');
    expect(bundles[0]).toHaveProperty('controls');
    expect(bundles[0].controls).toHaveProperty('startBtn');
    expect(bundles[0].controls).toHaveProperty('stopBtn');
    expect(bundles[0].controls).toHaveProperty('editBtn');
    expect(bundles[0].controls).toHaveProperty('removeBtn');
  });

  test('re-renders: removes previous cards and appends new ones', () => {
    const container = document.createElement('ul');

    mockedCreateCarCard.mockImplementation(() => makeMockCard(1) as any);
    RenderCarCards(container, [{ id: 1, name: 'Old', color: '#000' }]);

    expect(container.querySelectorAll('.car-card')).toHaveLength(1);

    mockedCreateCarCard.mockReset();
    mockedCreateCarCard.mockImplementation(() => makeMockCard(2) as any);

    RenderCarCards(container, [{ id: 2, name: 'New', color: '#fff' }]);

    expect(container.querySelectorAll('.car-card')).toHaveLength(1);
    expect(
      (container.querySelector('.car-card') as HTMLElement).dataset.carId
    ).toBe('2');
  });
});
