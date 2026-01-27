import { CreateColorPicker } from '@/components/ui/color-picker/color-picker';
import { DEFAULT_COLOR } from '@/constants/constants';

describe('CreateColorPicker', () => {
  test('matches snapshot', () => {
    const view = CreateColorPicker({
      id: 'car-color',
      name: 'color',
      label: 'Color',
    });

    expect(view.root).toMatchSnapshot();
  });

  test('renders correct structure and attributes', () => {
    const view = CreateColorPicker({
      id: 'car-color',
      name: 'color',
      label: 'Color',
    });

    expect(view.root).toHaveClass('color-picker');

    const label = view.root.querySelector('label.color-picker__label');
    expect(label).not.toBeNull();
    expect(label?.textContent).toBe('Color');
    expect(label?.getAttribute('for')).toBe('car-color');

    expect(view.input).toBeInstanceOf(HTMLInputElement);
    expect(view.input).toHaveClass('color-picker__input');
    expect(view.input.type).toBe('color');
    expect(view.input.id).toBe('car-color');
    expect(view.input.name).toBe('color');

    const control = view.root.querySelector('.color-picker__control');
    expect(control).not.toBeNull();
    expect(control?.contains(view.input)).toBe(true);
  });

  test('sets default color when value is not provided', () => {
    const view = CreateColorPicker({
      id: 'car-color',
      name: 'color',
      label: 'Color',
    });

    expect(view.input.value).toBe(DEFAULT_COLOR);
  });

  test('uses provided value when value is passed', () => {
    const view = CreateColorPicker({
      id: 'car-color',
      name: 'color',
      label: 'Color',
      value: '#ff00ff',
    });

    expect(view.input.value).toBe('#ff00ff');
  });
});
