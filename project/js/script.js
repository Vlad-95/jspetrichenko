/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
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
    const addForm = main.querySelector('form.add');
    const inputName = main.querySelector('.add .adding__input');
    const checkbox = main.querySelector('[type="checkbox"]');
    
    //удаляем рекламные блоки
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };    
    
    const makeChanges = () => {
        //меняем жанр
        promoGenre.textContent = 'Драма';
            
        //меняем фон
        promoBg.style.backgroundImage = 'url("img/bg.jpg")';
    };

    const sortArr = (arr) => {
       arr.sort();
    };
    
    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
        });
    }
    
    //клик по кнопке в форме
    addForm.addEventListener('submit', (evt) => {
        evt.preventDefault();

        let newFilm = inputName.value;
        const favourite = checkbox.checked;

        if(newFilm) {

            if(newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if(favourite) {
                console.log('Добавляем любимый фильм');
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
        
            createMovieList(movieDB.movies, watchingMoviesList);
        }        

        evt.target.reset();        
        
    });

    deleteAdv(advImages);
    makeChanges();
    createMovieList(movieDB.movies, watchingMoviesList);
});