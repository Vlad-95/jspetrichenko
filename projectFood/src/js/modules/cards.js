function cards() {
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

    const getResource = async function(url) {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Сould not fetch ${url}, status ${result.status}`);
        }

        return await result.json(); // Это промис
    };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({title, descr, price, img, altimg}) => {
    //             new MenuCard(title, descr, price, img, altimg, '.menu .container').render();
    //         });
    //     });

    //=======ПРИМЕР С БИБЛИОТЕКОЙ Axios
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({title, descr, price, img, altimg}) => {
    //             new MenuCard(title, descr, price, img, altimg, '.menu .container').render();
    //         });
    //     });    

    //====================================




    //=============ЕЩЕ ОДИН СПОСОБ ВЫВОДА ДИНАМИЧЕСКИХ КАРТОЧЕК 
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));
    
    // function createCard(data) {
    //     data.forEach(({title, descr, price, img, altimg}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src="${img}" alt="${altimg}">
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }
    //==================================================================
}

module.exports = cards;