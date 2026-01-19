import type { ButtonProperties, UIButton } from '@/types/type';
import { createElement } from '@/utils/create-element';

export function CreateButton(properties: ButtonProperties): UIButton {
  const {
    label,
    variant = 'default',
    size = 'md',
    type = 'button',
    disabled = false,
    ariaLabel,
    dataset,
  } = properties;

  const root = createElement('button', {
    className: `btn btn-${variant} btn-${size}`,
    textContent: label,
    attrs: ariaLabel ? { type, 'aria-label': ariaLabel } : { type },
    dataset,
  });

  root.disabled = disabled;

  return { root };
}
