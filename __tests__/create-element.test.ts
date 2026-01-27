import { createElement } from '@/utils/create-element';

describe('createElement', () => {
  test('creates element with given tag', () => {
    const el = createElement('section');
    expect(el.tagName.toLowerCase()).toBe('section');
  });

  test('applies className', () => {
    const el = createElement('div', { className: 'a b' });
    expect(el.className).toBe('a b');
  });

  test('sets textContent (including empty string)', () => {
    const el1 = createElement('p', { textContent: 'Hello' });
    expect(el1.textContent).toBe('Hello');

    const el2 = createElement('p', { textContent: '' });
    expect(el2.textContent).toBe('');
  });

  test('does not set textContent when textContent is undefined', () => {
    const el = createElement('p');
    expect(el.textContent).toBe('');
  });

  test('applies attributes', () => {
    const el = createElement('button', {
      attrs: { type: 'button', 'aria-label': 'Click me' },
    });

    expect(el.getAttribute('type')).toBe('button');
    expect(el.getAttribute('aria-label')).toBe('Click me');
  });

  test('applies dataset', () => {
    const el = createElement('div', {
      dataset: { action: 'car-create', id: '123' },
    });

    expect(el.dataset.action).toBe('car-create');
    expect(el.dataset.id).toBe('123');
  });

  test('appends children in order', () => {
    const child1 = document.createElement('span');
    child1.textContent = 'one';
    const child2 = document.createElement('span');
    child2.textContent = 'two';

    const el = createElement('div', { children: [child1, child2] });

    expect(el.children).toHaveLength(2);
    expect(el.children[0].textContent).toBe('one');
    expect(el.children[1].textContent).toBe('two');
  });

  test('does not append children when children is empty or missing', () => {
    const el1 = createElement('div', { children: [] });
    expect(el1.childNodes).toHaveLength(0);

    const el2 = createElement('div');
    expect(el2.childNodes).toHaveLength(0);
  });

  test('supports Node children (e.g., Text nodes)', () => {
    const text = document.createTextNode('text-node');
    const el = createElement('div', { children: [text] });

    expect(el.childNodes).toHaveLength(1);
    expect(el.textContent).toBe('text-node');
  });
});
