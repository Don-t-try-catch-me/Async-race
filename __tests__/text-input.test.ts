import { CreateTextInput } from '@/components/ui/text-input/text-input';

describe('CreateTextInput', () => {
  test('renders base structure with required props', () => {
    const view = CreateTextInput({
      id: 'car-name',
      name: 'name',
      label: 'Car name',
    });

    expect(view.root).toBeInstanceOf(HTMLElement);
    expect(view.root.tagName).toBe('DIV');
    expect(view.root).toHaveClass('text-input');

    const labelEl = view.root.querySelector('label');
    const inputEl = view.root.querySelector('input');

    expect(labelEl).not.toBeNull();
    expect(inputEl).not.toBeNull();

    expect(labelEl).toHaveClass('text-input__label');
    expect(labelEl).toHaveTextContent('Car name');
    expect(labelEl).toHaveAttribute('for', 'car-name');

    expect(inputEl).toHaveClass('text-input__control');
    expect(inputEl).toHaveAttribute('type', 'text');
    expect(inputEl).toHaveAttribute('id', 'car-name');
    expect(inputEl).toHaveAttribute('name', 'name');
    expect(inputEl).toHaveAttribute('autocomplete', 'off');

    expect(inputEl).toHaveAttribute('placeholder', '');
  });

  test('uses provided placeholder', () => {
    const view = CreateTextInput({
      id: 'car-name',
      name: 'name',
      label: 'Car name',
      placeholder: 'Enter car name',
    });

    expect(view.input).toHaveAttribute('placeholder', 'Enter car name');
  });

  test('sets initial value when provided', () => {
    const view = CreateTextInput({
      id: 'car-name',
      name: 'name',
      label: 'Car name',
      value: 'BMW',
    });

    expect(view.input.value).toBe('BMW');
  });

  test('does not set value when not provided (keeps default empty string)', () => {
    const view = CreateTextInput({
      id: 'car-name',
      name: 'name',
      label: 'Car name',
    });

    expect(view.input.value).toBe('');
  });

  test('setError(true) adds error classes; setError(false) removes them', () => {
    const view = CreateTextInput({
      id: 'car-name',
      name: 'name',
      label: 'Car name',
    });

    expect(view.root).not.toHaveClass('text-input__state_error');
    expect(view.input).not.toHaveClass('text-input__control_error');

    view.setError(true);
    expect(view.root).toHaveClass('text-input__state_error');
    expect(view.input).toHaveClass('text-input__control_error');

    view.setError(false);
    expect(view.root).not.toHaveClass('text-input__state_error');
    expect(view.input).not.toHaveClass('text-input__control_error');
  });
});
