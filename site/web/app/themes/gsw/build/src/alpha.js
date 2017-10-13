import styles from './alpha.css';

function component() {
  const element = document.createElement('div');
  element.innerHTML = 'Hello from alpha';
  element.classList.add(styles.danger);
  return element;
}

document.body.appendChild(component());
