const createFilmsListExtraTemplate = (titleExtraList) => {
  return (
    `
     <section class="films-list--extra">
      <h2 class="films-list__title">${titleExtraList}</h2>
      <div class="films-list__container"></div>
     </section>
    `
  );
};

export {createFilmsListExtraTemplate};
