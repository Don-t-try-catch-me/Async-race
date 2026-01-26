import { CreateCarCard } from '@/components/car-card/car-card';

jest.mock('@/utils/control-car', () => {
  return {
    CarController: jest
      .fn()
      .mockImplementation(
        (
          id: number,
          car: HTMLSpanElement,
          road: HTMLDivElement,
          onUiState: (s: {
            startDisabled?: boolean;
            stopDisabled?: boolean;
          }) => void
        ) => {
          return {
            id,
            car,
            road,

            startEngineAndDrive: jest.fn(async () => undefined),
            stopCar: jest.fn(async () => undefined),

            __emitUiState: onUiState,
          };
        }
      ),
  };
});

import { CarController } from '@/utils/control-car';

describe('CreateCarCard', () => {
  const props = {
    id: 7,
    name: 'Rocket',
    color: '#123456',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders main structure and dataset', () => {
    const { root, controls } = CreateCarCard(props);

    expect(root.tagName).toBe('LI');
    expect(root).toHaveClass('car-card');
    expect(root.dataset.carId).toBe(String(props.id));

    const title = root.querySelector<HTMLHeadingElement>('.car-card__name');
    expect(title).not.toBeNull();
    expect(title!.textContent).toBe(props.name);

    expect(controls.editBtn).toBeInstanceOf(HTMLButtonElement);
    expect(controls.removeBtn).toBeInstanceOf(HTMLButtonElement);
    expect(controls.startBtn).toBeInstanceOf(HTMLButtonElement);
    expect(controls.stopBtn).toBeInstanceOf(HTMLButtonElement);
  });

  test('creates buttons with correct dataset actions and aria-labels', () => {
    const { controls } = CreateCarCard(props);

    expect(controls.editBtn.dataset.action).toBe('car-edit');
    expect(controls.editBtn.dataset.id).toBe(String(props.id));
    expect(controls.editBtn.getAttribute('aria-label')).toBe(
      `Edit car ${props.name}`
    );

    expect(controls.removeBtn.dataset.action).toBe('car-remove');
    expect(controls.removeBtn.dataset.id).toBe(String(props.id));
    expect(controls.removeBtn.getAttribute('aria-label')).toBe(
      `Remove car ${props.name}`
    );

    expect(controls.startBtn.dataset.action).toBe('car-start');
    expect(controls.startBtn.dataset.id).toBe(String(props.id));
    expect(controls.startBtn.getAttribute('aria-label')).toBe(
      `Start car ${props.name}`
    );

    expect(controls.stopBtn.dataset.action).toBe('car-stop');
    expect(controls.stopBtn.dataset.id).toBe(String(props.id));
    expect(controls.stopBtn.getAttribute('aria-label')).toBe(
      `Stop car ${props.name}`
    );
  });

  test('passes correct args to CarController constructor', () => {
    const { root } = CreateCarCard(props);

    expect(CarController).toHaveBeenCalledTimes(1);

    const call = (CarController as unknown as jest.Mock).mock.calls[0];
    const [id, icon, road, cb] = call;

    expect(id).toBe(props.id);
    expect(icon).toBeInstanceOf(HTMLSpanElement);
    expect(road).toBeInstanceOf(HTMLDivElement);
    expect(typeof cb).toBe('function');

    expect(root.contains(icon)).toBe(true);
    expect(root.contains(road)).toBe(true);
  });

  test('matches snapshot', () => {
    const { root } = CreateCarCard(props);
    expect(root).toMatchSnapshot();
  });
});
