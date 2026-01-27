import { CarController } from '@utils/control-car';
import { drive, handleEngine } from '@/services/engine-service';
import { EngineError } from '@/utils/custom-errors';

jest.mock('@/services/engine-service', () => ({
  handleEngine: jest.fn(),
  drive: jest.fn(),
}));

const mockHandleEngine = jest.mocked(handleEngine);
const mockDrive = jest.mocked(drive);

describe('CarController', () => {
  let car: HTMLSpanElement;
  let road: HTMLDivElement;
  let lockControls: jest.Mock;
  let controller: CarController;

  const mockEngineResult = { velocity: 100, distance: 500000 };

  beforeEach(() => {
    jest.clearAllMocks();

    car = document.createElement('span');
    road = document.createElement('div');

    Object.defineProperty(car, 'clientWidth', {
      value: 50,
      configurable: true,
    });
    Object.defineProperty(road, 'clientWidth', {
      value: 500,
      configurable: true,
    });

    lockControls = jest.fn();
    controller = new CarController(1, car, road, lockControls);

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('startEngineAndDrive', () => {
    describe('when engine starts successfully', () => {
      beforeEach(() => {
        mockHandleEngine.mockResolvedValue(mockEngineResult);
        mockDrive.mockResolvedValue({ success: true });
      });

      it('should lock start button and unlock stop button', async () => {
        await controller.startEngineAndDrive();

        expect(lockControls).toHaveBeenCalledWith({
          startDisabled: true,
          stopDisabled: false,
        });
      });

      it('should call handleEngine with started status', async () => {
        await controller.startEngineAndDrive();

        expect(mockHandleEngine).toHaveBeenCalledWith(1, 'started');
      });

      it('should call drive with abort signal', async () => {
        await controller.startEngineAndDrive();

        expect(mockDrive).toHaveBeenCalledWith(1, expect.any(AbortSignal));
      });

      it('should return id and time on successful drive', async () => {
        const result = await controller.startEngineAndDrive();

        expect(result).toEqual({
          id: 1,
          time: mockEngineResult.distance / mockEngineResult.velocity,
        });
      });

      it('should call stopCar after drive completes', async () => {
        await controller.startEngineAndDrive();

        expect(mockHandleEngine).toHaveBeenLastCalledWith(1, 'stopped');
      });

      it('should unlock controls in finally block', async () => {
        await controller.startEngineAndDrive();

        expect(lockControls).toHaveBeenLastCalledWith({
          startDisabled: false,
          stopDisabled: true,
        });
      });
    });

    describe('when engine fails to start', () => {
      beforeEach(() => {
        mockHandleEngine.mockResolvedValue(undefined);
      });

      it('should return undefined', async () => {
        const result = await controller.startEngineAndDrive();

        expect(result).toBeUndefined();
      });

      it('should restore controls to initial state', async () => {
        await controller.startEngineAndDrive();

        expect(lockControls).toHaveBeenLastCalledWith({
          startDisabled: false,
          stopDisabled: true,
        });
      });

      it('should not call drive', async () => {
        await controller.startEngineAndDrive();

        expect(mockDrive).not.toHaveBeenCalled();
      });
    });

    describe('when drive throws EngineError', () => {
      beforeEach(() => {
        mockHandleEngine.mockResolvedValue(mockEngineResult);
        mockDrive.mockRejectedValue(new EngineError());
      });

      it('should stop the car', async () => {
        await controller.startEngineAndDrive();

        expect(mockHandleEngine).toHaveBeenCalledWith(1, 'stopped');
      });

      it('should return undefined', async () => {
        const result = await controller.startEngineAndDrive();

        expect(result).toBeUndefined();
      });
    });

    describe('when drive is aborted', () => {
      beforeEach(() => {
        mockHandleEngine.mockResolvedValue(mockEngineResult);
        const abortError = new Error('Aborted');
        abortError.name = 'AbortError';
        mockDrive.mockRejectedValue(abortError);
      });

      it('should stop the car', async () => {
        await controller.startEngineAndDrive();

        expect(mockHandleEngine).toHaveBeenCalledWith(1, 'stopped');
      });
    });
  });

  describe('stopCar', () => {
    describe('when intentional is true', () => {
      it('should reset car position', async () => {
        car.style.setProperty('--car-x', '100px');

        await controller.stopCar(true);

        expect(car.style.getPropertyValue('--car-x')).toBe('');
      });

      it('should call handleEngine with stopped status', async () => {
        await controller.stopCar(true);

        expect(mockHandleEngine).toHaveBeenCalledWith(1, 'stopped');
      });

      it('should cancel animation frame', async () => {
        await controller.stopCar(true);

        expect(cancelAnimationFrame).toHaveBeenCalled();
      });
    });

    describe('when intentional is false', () => {
      it('should not reset car position', async () => {
        car.style.setProperty('--car-x', '100px');

        await controller.stopCar(false);

        expect(car.style.getPropertyValue('--car-x')).toBe('100px');
      });

      it('should still call handleEngine with stopped status', async () => {
        await controller.stopCar(false);

        expect(mockHandleEngine).toHaveBeenCalledWith(1, 'stopped');
      });
    });
  });

  describe('reset', () => {
    it('should remove --car-x CSS property', () => {
      car.style.setProperty('--car-x', '200px');

      controller.reset();

      expect(car.style.getPropertyValue('--car-x')).toBe('');
    });
  });

  describe('without lockControls callback', () => {
    it('should not throw when lockControls is undefined', async () => {
      const controllerWithoutLock = new CarController(1, car, road);
      mockHandleEngine.mockResolvedValue(undefined);

      await expect(
        controllerWithoutLock.startEngineAndDrive()
      ).resolves.not.toThrow();
    });
  });
});
