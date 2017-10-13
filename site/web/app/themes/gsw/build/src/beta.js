function component() {
  const element = document.createElement('div');
  element.innerHTML = 'Hello from beta';
  return element;
}

document.body.appendChild(component());
