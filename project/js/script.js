/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const main = document.querySelector('.promo');
const advImages = main.querySelectorAll('.promo__adv img');
const promoGenre = main.querySelector('.promo__content .promo__genre');
const promoBg = main.querySelector('.promo__content .promo__bg');
const watchingMoviesList = main.querySelector('.promo__interactive-list');

//удаляем рекламные блоки
advImages.forEach(item => {
    item.remove();
});

//меняем жанр
promoGenre.textContent = 'Драма';

//меняем фон
promoBg.style.backgroundImage = 'url("img/bg.jpg")';

//Меняем список фильмов
watchingMoviesList.innerHTML = '';
movieDB.movies.sort();

movieDB.movies.forEach((film, i) => {
    watchingMoviesList.innerHTML += `
        <li class="promo__interactive-item">${i + 1}. ${film}
            <div class="delete"></div>
        </li>
    `;
});

// watchingMovies.forEach((item, index) => {
//     item.innerHTML = `${index + 1}. ${movieDB.movies[index]} <div class="delete"></div>`;
// })