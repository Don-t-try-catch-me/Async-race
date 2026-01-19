import { createElement } from '@/utils/create-element';
import type { TextInputProperties, TextInputView } from '@/types/type';

export function CreateTextInput(
  properties: TextInputProperties
): TextInputView {
  const root = createElement('div', { className: 'text-input' });

  const label = createElement('label', {
    className: 'text-input__label',
    textContent: properties.label,
    attrs: { for: properties.id },
  });

  const input = createElement('input', {
    className: 'text-input__control',
    attrs: {
      type: 'text',
      id: properties.id,
      name: properties.name,
      placeholder: properties.placeholder ?? '',
      autocomplete: 'off',
    },
  });

  if (properties.value !== undefined) {
    input.value = properties.value;
  }

  root.append(label, input);

  return { root, input };
}
