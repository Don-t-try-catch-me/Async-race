import type { TextInputProperties, TextInputView } from '@/types/type';

export function createTextInput(
  properties: TextInputProperties
): TextInputView {
  const root = document.createElement('div');
  root.className = 'text-input';

  const label = document.createElement('label');
  label.className = 'text-input__label';
  label.htmlFor = properties.id;
  label.textContent = properties.label;

  const input = document.createElement('input');
  input.className = 'text-input__control';
  input.type = 'text';
  input.id = properties.id;
  input.name = properties.name;
  input.placeholder = properties.placeholder ?? '';
  input.autocomplete = 'off';

  if (properties.value !== undefined) {
    input.value = properties.value;
  }

  root.append(label, input);

  return { root, input };
}
