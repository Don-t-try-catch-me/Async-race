import { createElement } from '@/utils/create-element';

describe('test template', () => {
  test('should do smth', () => {
    const el = createElement('div', {
      textContent: 'test content',
      className: 'test-class',
    });

    expect(el.className).toBe('test-class');
  });
});
