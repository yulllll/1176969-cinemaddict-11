// Перечисления места вставки DOM-элемента
export const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
};

// Функция для создания DOM-элемента
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Функция для отрисовки созданного компонента
export const render = (container, component, place = RenderPosition.BEFORE_END) => {
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
export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
