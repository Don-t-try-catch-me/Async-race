import { createElement } from '@/utils/create-element';
import type { ColorPickerProperties, ColorPickerView } from '@/types/type';
import { DEFAULT_COLOR } from '@/constants/constants';

export function CreateColorPicker(
  properties: ColorPickerProperties
): ColorPickerView {
  const root = createElement('div', { className: 'color-picker' });

  const label = createElement('label', {
    className: 'color-picker__label',
    textContent: properties.label,
    attrs: { for: properties.id },
  });

  const input = createElement('input', {
    className: 'color-picker__input',
    attrs: {
      type: 'color',
      id: properties.id,
      name: properties.name,
    },
  });

  input.value = properties.value ?? DEFAULT_COLOR;

  const control = createElement('div', {
    className: 'color-picker__control',
    children: [input],
  });

  control.append(input);
  root.append(label, control);

  return { root, input };
}
