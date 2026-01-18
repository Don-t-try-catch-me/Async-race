import type { ButtonProperties, UIButton } from '@/types/type';

export function createButton(properties: ButtonProperties): UIButton {
  const {
    label,
    variant = 'default',
    size = 'md',
    type = 'button',
    disabled = false,
    ariaLabel,
    dataset,
  } = properties;

  const root = document.createElement('button');
  root.className = `btn btn-${variant} btn-${size}`;
  root.type = type;
  root.disabled = disabled;
  root.textContent = label;

  if (ariaLabel) root.setAttribute('aria-label', ariaLabel);

  if (dataset) {
    for (const [key, value] of Object.entries(dataset)) {
      root.dataset[key] = value;
    }
  }

  return { root };
}
