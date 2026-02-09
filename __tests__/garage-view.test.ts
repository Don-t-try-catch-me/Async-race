import { createGarageView } from '@pages/garage/garage-view';
import { CreateTotalCounter } from '@/components/ui/total-counter/total-counter';
import { CreateTextInput } from '@/components/ui/text-input/text-input';
import { CreateColorPicker } from '@/components/ui/color-picker/color-picker';
import { CreateCarCardList } from '@/components/car-card-list/car-card-list';
import { CreatePaginationView } from '@/components/ui/pagination/pagination-view';
import { CreateButton } from '@/components/ui/button/button';
import { CreateRaceControls } from '@/components/race-controls/race-controls';

jest.mock('@/components/ui/total-counter/total-counter');
jest.mock('@/components/ui/text-input/text-input');
jest.mock('@/components/ui/color-picker/color-picker');
jest.mock('@/components/car-card-list/car-card-list');
jest.mock('@/components/ui/pagination/pagination-view');
jest.mock('@/components/ui/button/button');
jest.mock('@/components/race-controls/race-controls');

const mockCreateTotalCounter = jest.mocked(CreateTotalCounter);
const mockCreateTextInput = jest.mocked(CreateTextInput);
const mockCreateColorPicker = jest.mocked(CreateColorPicker);
const mockCreateCarCardList = jest.mocked(CreateCarCardList);
const mockCreatePaginationView = jest.mocked(CreatePaginationView);
const mockCreateButton = jest.mocked(CreateButton);
const mockCreateRaceControls = jest.mocked(CreateRaceControls);

describe('createGarageView', () => {
  const mockElements = {
    totalCounter: {
      root: document.createElement('div'),
      change: jest.fn(),
    },
    textInput: {
      root: document.createElement('div'),
      input: document.createElement('input'),
      setError: jest.fn(),
    },
    colorPicker: {
      root: document.createElement('div'),
      input: document.createElement('input'),
    },
    carCardList: {
      root: document.createElement('div'),
    },
    pagination: {
      root: document.createElement('div'),
      prevBtn: document.createElement('button'),
      nextBtn: document.createElement('button'),
      label: document.createElement('span'),
    },
    createBtn: { root: document.createElement('button') },
    updateBtn: { root: document.createElement('button') },
    generateBtn: { root: document.createElement('button') },
    raceControls: {
      root: document.createElement('div'),
      raceBtn: document.createElement('button'),
      resetBtn: document.createElement('button'),
      startCountDown: jest.fn(),
      message: {
        root: document.createElement('div'),
        setText: jest.fn(),
        setVariant: jest.fn(),
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockCreateTotalCounter.mockReturnValue(mockElements.totalCounter as any);
    mockCreateTextInput.mockReturnValue(mockElements.textInput as any);
    mockCreateColorPicker.mockReturnValue(mockElements.colorPicker as any);
    mockCreateCarCardList.mockReturnValue(mockElements.carCardList as any);
    mockCreatePaginationView.mockReturnValue(mockElements.pagination as any);
    mockCreateRaceControls.mockReturnValue(mockElements.raceControls as any);

    mockCreateButton
      .mockReturnValueOnce(mockElements.createBtn as any)
      .mockReturnValueOnce(mockElements.updateBtn as any)
      .mockReturnValueOnce(mockElements.generateBtn as any);
  });

  describe('structure', () => {
    it('should return object with all required properties', () => {
      const view = createGarageView({ totalCars: 10 });

      expect(view).toHaveProperty('root');
      expect(view).toHaveProperty('nameInput');
      expect(view).toHaveProperty('setNameError');
      expect(view).toHaveProperty('colorInput');
      expect(view).toHaveProperty('createBtn');
      expect(view).toHaveProperty('updateBtn');
      expect(view).toHaveProperty('generateBtn');
      expect(view).toHaveProperty('carListContainer');
      expect(view).toHaveProperty('prevBtn');
      expect(view).toHaveProperty('nextBtn');
      expect(view).toHaveProperty('pageLabel');
      expect(view).toHaveProperty('raceControls');
      expect(view).toHaveProperty('total');
    });

    it('should return correct element references', () => {
      const view = createGarageView({ totalCars: 10 });

      expect(view.nameInput).toBe(mockElements.textInput.input);
      expect(view.setNameError).toBe(mockElements.textInput.setError);
      expect(view.colorInput).toBe(mockElements.colorPicker.input);
      expect(view.createBtn).toBe(mockElements.createBtn.root);
      expect(view.updateBtn).toBe(mockElements.updateBtn.root);
      expect(view.generateBtn).toBe(mockElements.generateBtn.root);
      expect(view.carListContainer).toBe(mockElements.carCardList.root);
      expect(view.prevBtn).toBe(mockElements.pagination.prevBtn);
      expect(view.nextBtn).toBe(mockElements.pagination.nextBtn);
      expect(view.pageLabel).toBe(mockElements.pagination.label);
      expect(view.raceControls).toBe(mockElements.raceControls);
      expect(view.total).toBe(mockElements.totalCounter);
    });
  });

  describe('component initialization', () => {
    it('should create total counter with correct props', () => {
      createGarageView({ totalCars: 42 });

      expect(mockCreateTotalCounter).toHaveBeenCalledWith({
        label: 'cars',
        count: 42,
      });
    });

    it('should create text input with correct props', () => {
      createGarageView({ totalCars: 10 });

      expect(mockCreateTextInput).toHaveBeenCalledWith({
        id: 'garage-car-name',
        name: 'name',
        label: 'Add your car name to the race',
        placeholder: 'Enter car name',
      });
    });

    it('should create color picker with correct props', () => {
      createGarageView({ totalCars: 10 });

      expect(mockCreateColorPicker).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'garage-car-color',
          name: 'color',
          label: 'Color',
        })
      );
    });

    it('should create pagination with initial values', () => {
      createGarageView({ totalCars: 10 });

      expect(mockCreatePaginationView).toHaveBeenCalledWith({
        page: 1,
        totalPages: 1,
      });
    });

    it('should create three buttons', () => {
      createGarageView({ totalCars: 10 });

      expect(mockCreateButton).toHaveBeenCalledTimes(3);
    });

    it('should create CREATE button with correct props', () => {
      createGarageView({ totalCars: 10 });

      expect(mockCreateButton).toHaveBeenCalledWith(
        expect.objectContaining({
          label: 'CREATE',
          variant: 'primary',
          ariaLabel: 'Create car',
        })
      );
    });

    it('should create UPDATE button disabled by default', () => {
      createGarageView({ totalCars: 10 });

      expect(mockCreateButton).toHaveBeenCalledWith(
        expect.objectContaining({
          label: 'UPDATE',
          disabled: true,
        })
      );
    });
  });

  describe('DOM structure', () => {
    it('should create root as section element', () => {
      const view = createGarageView({ totalCars: 10 });

      expect(view.root.tagName).toBe('SECTION');
      expect(view.root.className).toBe('page');
    });

    it('should contain title with correct text', () => {
      const view = createGarageView({ totalCars: 10 });
      const title = view.root.querySelector('h1');

      expect(title).not.toBeNull();
      expect(title?.textContent).toBe('Garage');
    });

    it('should match snapshot', () => {
      const view = createGarageView({ totalCars: 10 });

      expect(view.root).toMatchSnapshot();
    });
  });
});
