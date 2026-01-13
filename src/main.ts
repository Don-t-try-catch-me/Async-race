import './style.css';

export const root =
  document.querySelector('#root') ?? document.createElement('main');
root.id = 'root';

if (!document.querySelector('#root')) {
  document.body.append(root);
}

const h1 = document.createElement('h1')
h1.textContent = 'Async race'
root.append(h1)