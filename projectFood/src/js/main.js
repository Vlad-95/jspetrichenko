'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) { // параметр по умолчанию
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //timer
    
    const deadLine = '2022-05-11';

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            'total' : t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);
    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    //генерация карточек
    class MenuCard {
        constructor(title, descr, price, src, alt, parentSelector, ...classes) {
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.src = src;
            this.alt = alt;
            this.transfer = 27;
            this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (!this.classes.length) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className)); 
            }
            
            element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element);
        }
    }

    new MenuCard(
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '9',
        'img/tabs/vegy.jpg',
        'Описание фотки',
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        'Меню "Премиум"', 
        'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        '10',
        'img/tabs/elite.jpg',
        'Описание фотки',
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        'Меню "Постное"', 
        'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        '11',
        'img/tabs/post.jpg',
        'Описание фотки',
        '.menu .container',
        
    ).render();

    //Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            // const formData = new FormData(form); // собираем данные из формы

            // request.send(formData);

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         statusMessage.textContent = message.success;
            //         form.reset();
            //         setTimeout(() => {
            //             statusMessage.remove();
            //         }, 2000);
            //     } else {
            //         statusMessage.textContent = message.failure;
            //     }
            // });

            //============== JSON ФОРМАТ
            request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form); // собираем данные из формы
            const object = {};
            
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

});