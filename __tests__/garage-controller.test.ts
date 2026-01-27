import { createGarageController } from '@pages/garage/garage-controller';
import { createGarageView } from '@pages/garage/garage-view';
import * as carService from '@/services/car-service';
import * as winnerService from '@/services/winner-service';
import { getCarName } from '@/utils/get-car-name';
import { getColor } from '@/utils/get-color';
import { RenderCarCards } from '@/components/car-card-list/car-card-list-render';
import type { CarDto, GarageView, CarCardControllerBundle } from '@/types/type';

jest.mock('@pages/garage/garage-view');
jest.mock('@/services/car-service');
jest.mock('@/services/winner-service');
jest.mock('@/utils/get-car-name');
jest.mock('@/utils/get-color');
jest.mock('@/components/car-card-list/car-card-list-render');

const mockCreateGarageView = jest.mocked(createGarageView);
const mockGetCars = jest.mocked(carService.getCars);
const mockGetCar = jest.mocked(carService.getCar);
const mockCreateCar = jest.mocked(carService.createCar);
const mockUpdateCar = jest.mocked(carService.updateCar);
const mockDeleteCar = jest.mocked(carService.deleteCar);
const mockDeleteWinner = jest.mocked(winnerService.deleteWinner);
const mockHandleWinner = jest.mocked(winnerService.handleWinner);
const mockGetCarName = jest.mocked(getCarName);
const mockGetColor = jest.mocked(getColor);
const mockRenderCarCards = jest.mocked(RenderCarCards);

describe('GarageController', () => {
  let mockView: GarageView;
  let mockUpdateWinners: jest.Mock;
  let mockBundles: CarCardControllerBundle[];
  let consoleErrorSpy: jest.SpyInstance;

  const createMockCar = (overrides?: Partial<CarDto>): CarDto => ({
    id: 1,
    name: 'Test Car',
    color: '#ff0000',
    ...overrides,
  });

  const createMockView = (): GarageView => {
    const root = document.createElement('section');
    const nameInput = document.createElement('input');
    const colorInput = document.createElement('input');
    colorInput.value = '#ff0000';

    return {
      root,
      nameInput,
      setNameError: jest.fn(),
      colorInput,
      createBtn: document.createElement('button'),
      updateBtn: document.createElement('button'),
      generateBtn: document.createElement('button'),
      carListContainer: document.createElement('div'),
      prevBtn: document.createElement('button'),
      nextBtn: document.createElement('button'),
      pageLabel: document.createElement('span'),
      raceControls: {
        root: document.createElement('div'),
        raceBtn: document.createElement('button'),
        resetBtn: document.createElement('button'),
        startCountDown: jest.fn().mockResolvedValue(undefined),
        message: {
          root: document.createElement('div'),
          setText: jest.fn(),
          setVariant: jest.fn(),
        },
      },
      total: {
        root: document.createElement('div'),
        change: jest.fn(),
      },
    };
  };

  const createMockBundle = (id: number): CarCardControllerBundle => ({
    controller: {
      startEngineAndDrive: jest.fn().mockResolvedValue({ id, time: 5000 }),
      stopCar: jest.fn().mockResolvedValue(undefined),
      reset: jest.fn(),
    } as any,
    controls: {
      startBtn: document.createElement('button'),
      stopBtn: document.createElement('button'),
      editBtn: document.createElement('button'),
      removeBtn: document.createElement('button'),
    },
  });

  const createCarCardElement = (id: number, buttonText: string) => {
    const carCard = document.createElement('div');
    carCard.className = 'car-card';
    carCard.dataset.carId = String(id);

    const metaActions = document.createElement('div');
    metaActions.className = 'car-card__meta-actions';

    const btn = document.createElement('button');
    btn.textContent = buttonText;

    metaActions.appendChild(btn);
    carCard.appendChild(metaActions);

    return { carCard, btn };
  };

  const simulateClick = (element: HTMLElement, target: HTMLElement) => {
    const event = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(event, 'target', { value: target });
    element.dispatchEvent(event);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    mockView = createMockView();
    mockCreateGarageView.mockReturnValue(mockView);

    mockBundles = [createMockBundle(1), createMockBundle(2)];
    mockRenderCarCards.mockReturnValue(mockBundles);

    mockGetCars.mockResolvedValue({
      items: [createMockCar({ id: 1 }), createMockCar({ id: 2 })],
      totalCount: 2,
    });

    mockUpdateWinners = jest.fn().mockResolvedValue(undefined);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('initialization', () => {
    it('should fetch cars on creation', async () => {
      await createGarageController(mockUpdateWinners);

      expect(mockGetCars).toHaveBeenCalledWith(1);
    });

    it('should create view with total cars count', async () => {
      await createGarageController(mockUpdateWinners);

      expect(mockCreateGarageView).toHaveBeenCalledWith({ totalCars: 2 });
    });

    it('should return view root element', async () => {
      const result = await createGarageController(mockUpdateWinners);

      expect(result).toBe(mockView.root);
    });

    it('should render car cards', async () => {
      await createGarageController(mockUpdateWinners);

      expect(mockRenderCarCards).toHaveBeenCalledWith(
        mockView.carListContainer,
        expect.any(Array)
      );
    });

    it('should disable stop buttons initially', async () => {
      await createGarageController(mockUpdateWinners);

      for (const bundle of mockBundles) {
        expect(bundle.controls.stopBtn.disabled).toBe(true);
      }
    });
  });

  describe('create car', () => {
    it('should create car when name and color are valid', async () => {
      const newCar = createMockCar({ id: 3, name: 'New Car' });
      mockCreateCar.mockResolvedValue(newCar);

      await createGarageController(mockUpdateWinners);

      mockView.nameInput.value = 'New Car';
      mockView.createBtn.click();

      await new Promise((r) => setTimeout(r, 50));

      expect(mockCreateCar).toHaveBeenCalledWith({
        name: 'New Car',
        color: '#ff0000',
      });
    });

    it('should not create car when name is empty', async () => {
      await createGarageController(mockUpdateWinners);

      mockView.nameInput.value = '';
      mockView.createBtn.click();

      await new Promise((r) => setTimeout(r, 50));

      expect(mockCreateCar).not.toHaveBeenCalled();
      expect(mockView.setNameError).toHaveBeenCalledWith(true);
    });

    it('should clear input after successful creation', async () => {
      const newCar = createMockCar({ id: 3 });
      mockCreateCar.mockResolvedValue(newCar);

      await createGarageController(mockUpdateWinners);

      mockView.nameInput.value = 'New Car';
      mockView.createBtn.click();

      await new Promise((r) => setTimeout(r, 50));

      expect(mockView.nameInput.value).toBe('');
    });
  });

  describe('delete car', () => {
    it('should delete car and update winners', async () => {
      mockDeleteCar.mockResolvedValue(true);

      await createGarageController(mockUpdateWinners);

      const { carCard, btn } = createCarCardElement(1, 'REMOVE');
      mockView.root.appendChild(carCard);

      simulateClick(mockView.root, btn);

      await new Promise((r) => setTimeout(r, 50));

      expect(mockDeleteCar).toHaveBeenCalledWith(1);
      expect(mockDeleteWinner).toHaveBeenCalledWith(1);
      expect(mockUpdateWinners).toHaveBeenCalled();
    });
  });

  describe('edit car', () => {
    it('should populate form with car data when edit clicked', async () => {
      const car = createMockCar({ id: 1, name: 'Edit Me', color: '#00ff00' });
      mockGetCar.mockResolvedValue(car);

      await createGarageController(mockUpdateWinners);

      const { carCard, btn } = createCarCardElement(1, 'EDIT');
      mockView.root.appendChild(carCard);

      simulateClick(mockView.root, btn);

      await new Promise((r) => setTimeout(r, 50));

      expect(mockGetCar).toHaveBeenCalledWith(1);
      expect(mockView.nameInput.value).toBe('Edit Me');
      expect(mockView.colorInput.value).toBe('#00ff00');
      expect(mockView.updateBtn.disabled).toBe(false);
    });
  });

  describe('update car', () => {
    it('should update car with new data', async () => {
      const car = createMockCar({ id: 1, name: 'Original' });
      const updatedCar = createMockCar({
        id: 1,
        name: 'Updated',
        color: '#0000ff',
      });

      mockGetCar.mockResolvedValue(car);
      mockUpdateCar.mockResolvedValue(updatedCar);

      await createGarageController(mockUpdateWinners);

      const { carCard, btn } = createCarCardElement(1, 'EDIT');
      mockView.root.appendChild(carCard);

      simulateClick(mockView.root, btn);

      await new Promise((r) => setTimeout(r, 50));

      mockView.nameInput.value = 'Updated';
      mockView.colorInput.value = '#0000ff';
      mockView.updateBtn.click();

      await new Promise((r) => setTimeout(r, 50));

      expect(mockUpdateCar).toHaveBeenCalledWith({
        id: 1,
        name: 'Updated',
        color: '#0000ff',
      });
    });
  });

  describe('generate cars', () => {
    it('should create multiple cars with random names and colors', async () => {
      mockGetCarName.mockReturnValue('Random Car');
      mockGetColor.mockReturnValue('#123456');
      mockCreateCar.mockResolvedValue(createMockCar());

      await createGarageController(mockUpdateWinners);

      mockView.generateBtn.click();

      await new Promise((r) => setTimeout(r, 100));

      expect(mockGetCarName).toHaveBeenCalled();
      expect(mockGetColor).toHaveBeenCalled();
      expect(mockCreateCar).toHaveBeenCalledWith({
        name: 'Random Car',
        color: '#123456',
      });
    });

    it('should disable controls during generation', async () => {
      mockCreateCar.mockResolvedValue(createMockCar());

      await createGarageController(mockUpdateWinners);

      mockView.generateBtn.click();

      expect(mockView.generateBtn.disabled).toBe(true);
      expect(mockView.createBtn.disabled).toBe(true);
      expect(mockView.raceControls.raceBtn.disabled).toBe(true);
    });
  });

  describe('pagination', () => {
    it('should fetch next page when next button clicked', async () => {
      mockGetCars.mockResolvedValue({
        items: [createMockCar()],
        totalCount: 20,
      });

      await createGarageController(mockUpdateWinners);

      mockGetCars.mockClear();
      mockView.nextBtn.click();

      await new Promise((r) => setTimeout(r, 50));

      expect(mockGetCars).toHaveBeenCalledWith(2);
    });

    it('should fetch previous page when prev button clicked', async () => {
      mockGetCars
        .mockResolvedValueOnce({ items: [createMockCar()], totalCount: 20 })
        .mockResolvedValueOnce({ items: [createMockCar()], totalCount: 20 })
        .mockResolvedValueOnce({ items: [createMockCar()], totalCount: 20 });

      await createGarageController(mockUpdateWinners);

      mockView.nextBtn.click();
      await new Promise((r) => setTimeout(r, 50));

      mockGetCars.mockClear();
      mockView.prevBtn.click();

      await new Promise((r) => setTimeout(r, 50));

      expect(mockGetCars).toHaveBeenCalledWith(1);
    });
  });

  describe('race', () => {
    it('should start countdown and race all cars', async () => {
      mockGetCar.mockResolvedValue(createMockCar({ id: 1, name: 'Winner' }));

      await createGarageController(mockUpdateWinners);

      mockView.raceControls.raceBtn.click();

      await new Promise((r) => setTimeout(r, 100));

      expect(mockView.raceControls.startCountDown).toHaveBeenCalled();
      for (const bundle of mockBundles) {
        expect(bundle.controller.startEngineAndDrive).toHaveBeenCalled();
      }
    });

    it('should disable controls during race', async () => {
      mockGetCar.mockResolvedValue(createMockCar());

      await createGarageController(mockUpdateWinners);

      mockView.raceControls.raceBtn.click();

      expect(mockView.raceControls.raceBtn.disabled).toBe(true);
      expect(mockView.generateBtn.disabled).toBe(true);
      expect(mockView.createBtn.disabled).toBe(true);
    });

    it('should handle winner after race completes', async () => {
      const winnerCar = createMockCar({ id: 1, name: 'Winner Car' });
      mockGetCar.mockResolvedValue(winnerCar);

      await createGarageController(mockUpdateWinners);

      mockView.raceControls.raceBtn.click();

      await new Promise((r) => setTimeout(r, 100));

      expect(mockHandleWinner).toHaveBeenCalled();
      expect(mockUpdateWinners).toHaveBeenCalled();
    });
  });

  describe('reset race', () => {
    it('should stop all cars when reset clicked', async () => {
      await createGarageController(mockUpdateWinners);

      mockView.raceControls.resetBtn.disabled = false;
      mockView.raceControls.resetBtn.click();

      await new Promise((r) => setTimeout(r, 50));

      for (const bundle of mockBundles) {
        expect(bundle.controller.stopCar).toHaveBeenCalledWith(true);
      }
    });

    it('should show loading message during reset', async () => {
      await createGarageController(mockUpdateWinners);

      mockView.raceControls.resetBtn.disabled = false;
      mockView.raceControls.resetBtn.click();

      await new Promise((r) => setTimeout(r, 10));

      expect(mockView.raceControls.message.setVariant).toHaveBeenCalledWith(
        'loading'
      );
    });
  });

  describe('name validation', () => {
    it('should show error when name input loses focus with empty value', async () => {
      await createGarageController(mockUpdateWinners);

      mockView.nameInput.value = '';
      mockView.nameInput.dispatchEvent(new Event('input'));

      expect(mockView.setNameError).toHaveBeenCalledWith(true);
    });

    it('should clear error when name input has value', async () => {
      await createGarageController(mockUpdateWinners);

      mockView.nameInput.value = 'Valid Name';
      mockView.nameInput.dispatchEvent(new Event('input'));

      expect(mockView.setNameError).toHaveBeenCalledWith(false);
    });
  });
});
