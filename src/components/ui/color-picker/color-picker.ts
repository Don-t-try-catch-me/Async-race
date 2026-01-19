import type { ColorPickerProperties, ColorPickerView } from '@/types/type';
import { DEFAULT_COLOR } from '@/constants/constants';

export function createColorPicker(
  properties: ColorPickerProperties
): ColorPickerView {
  const root = document.createElement('div');
  root.className = 'color-picker';

  const label = document.createElement('label');
  label.className = 'color-picker__label';
  label.htmlFor = properties.id;
  label.textContent = properties.label;

  const control = document.createElement('div');
  control.className = 'color-picker__control';

  const input = document.createElement('input');
  input.className = 'color-picker__input';
  input.type = 'color';
  input.id = properties.id;
  input.name = properties.name;

  const value = properties.value ?? DEFAULT_COLOR;
  input.value = value;

  control.append(input);
  root.append(label, control);

  return { root, input };
}
