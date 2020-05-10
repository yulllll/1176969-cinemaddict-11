// Перечисления места для вставки DOM-элемента
const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
};
// Функция для создания DOM-элемента
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
// Функция для отрисовки созданного компонента
const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFORE_END:
      container.append(component.getElement());
      break;
  }
};
// Функция для удаления
const remove = (element) => {
  element.remove();
};

export {createElement, render, RenderPosition, remove};
