const setActiveControls = (item) => {
  // Если item есть - добавляем класс
  return item ? `film-card__controls-item--active` : ``;
};

const createFilmCardTemplate = (movieCard) => {
  const {isWatchlist, isWatched, isFavorite, poster, title, rating, year, duration, genre, description, comments} = movieCard; // + comments

  return (
    `
     <article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
       <span class="film-card__year">${year}</span>
       <span class="film-card__duration">${duration}</span>
       <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
       <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${setActiveControls(isWatchlist)}">Add to watchlist</button>
       <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${setActiveControls(isWatched)}">Mark as watched</button>
       <button class="film-card__controls-item button film-card__controls-item--favorite ${setActiveControls(isFavorite)}">Mark as favorite</button>
      </form>
     </article>
    `
  );
};

export {createFilmCardTemplate};
