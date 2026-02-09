import type { CreateElementOptions } from '@/types/type';

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: CreateElementOptions = {}
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  const { className, textContent, attrs, dataset, children } = options;

  if (className) element.className = className;
  if (textContent !== undefined) element.textContent = textContent;

  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      element.setAttribute(key, value);
    }
  }

  if (dataset) {
    for (const [key, value] of Object.entries(dataset)) {
      element.dataset[key] = value;
    }
  }

  if (children?.length) {
    element.append(...children);
  }

  return element;
}
