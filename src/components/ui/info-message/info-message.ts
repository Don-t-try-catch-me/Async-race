import { createElement } from '@/utils/create-element';
import type {
  InfoMessageProperties,
  InfoMessageVariant,
  InfoMessageView,
} from '@/types/type';

function getVariantClass(variant: InfoMessageVariant): string {
  return `info-message--${variant}`;
}

export function CreateInfoMessage(
  properties: InfoMessageProperties
): InfoMessageView {
  const variant: InfoMessageVariant = properties.variant ?? 'loading';

  const root = createElement('div', {
    className: `info-message ${getVariantClass(variant)}`,
    attrs: { role: 'status', 'aria-live': 'polite' },
  });

  const textNode = createElement('span', {
    className: 'info-message__text',
    textContent: properties.text,
  });

  root.append(textNode);

  const setText = (text: string): void => {
    textNode.textContent = text;
  };

  const setVariant = (next: InfoMessageVariant): void => {
    root.classList.remove(
      'info-message--loading',
      'info-message--winner',
      'info-message--error'
    );
    root.classList.add(getVariantClass(next));
  };

  return { root, setText, setVariant };
}
