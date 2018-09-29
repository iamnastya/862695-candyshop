'use strict';

// функция рандома и выбора произвольного значения из массива

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var getArrayElement = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

// массивы

var NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var PICTURES = ['img/cards/ice-garlic.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-pig.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-eggplant.jpg', 'img/cards/ice-italian.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-cedar.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-chile.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-russian.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-spicy.jpg'];
var CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

var getContents = function () {
  var randomContents = [];
  var contentsAmount = randomInteger(1, CONTENTS.length);
  for (var i = 0; i < contentsAmount; i++) {
    randomContents.push(getArrayElement(CONTENTS));
  }
  return randomContents;
};

// функция, которая засовывает объекты в массив

var getCards = function (cardsAmount) {
  var cards = [];
  for (var i = 0; i < cardsAmount; i++) {
    var card = {
      name: getArrayElement(NAMES),
      picture: getArrayElement(PICTURES),
      amount: randomInteger(0, 20),
      price: randomInteger(100, 1500),
      weight: randomInteger(30, 300),
      rating: {
        value: randomInteger(0, 5),
        number: randomInteger(10, 900)
      },
      nutritionFacts: {
        sugar: Math.random() >= 0.5,
        energy: randomInteger(70, 500),
        contents: getContents()
      }
    };
    cards.push(card);
  }
  return cards;
};

// убираем catalog__cards--load и еще один класс

var userDialog = document.querySelector('.catalog__cards');
userDialog.classList.remove('catalog__cards--load');
userDialog.querySelector('.catalog__load').classList.add('visually-hidden');

// создаем DOM-элементы

var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.catalog__card');

var renderCard = function (element) {
  var cardElement = cardTemplate.cloneNode(true);

  if (element.amount >= 1 && element.amount <= 5) {
    cardElement.classList.add('card--little');
    cardElement.classList.remove('card--in-stock');
  } else if (element.amount === 0) {
    cardElement.classList.add('card--soon');
    cardElement.classList.remove('card--in-stock');
  }

  cardElement.querySelector('.card__title').textContent = element.name;

  cardElement.querySelector('.card__price').innerHTML = element.price + ' ' + '<span class="card__currency">₽</span><span class="card__weight">/ ' + element.weight + ' Г</span>';

  cardElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
  switch (element.rating.value) {
    case 1:
      cardElement.querySelector('.stars__rating').classList.add('stars__rating--one');
      break;
    case 2:
      cardElement.querySelector('.stars__rating').classList.add('stars__rating--two');
      break;
    case 3:
      cardElement.querySelector('.stars__rating').classList.add('stars__rating--three');
      break;
    case 4:
      cardElement.querySelector('.stars__rating').classList.add('stars__rating--four');
      break;
    case 5:
      cardElement.querySelector('.stars__rating').classList.add('stars__rating--five');
      break;
  }

  cardElement.querySelector('.star__count').textContent = element.rating.number;

  cardElement.querySelector('.card__img').src = element.picture;

  if (element.nutritionFacts.sugar) {
    cardElement.querySelector('.card__characteristic').textContent = 'Содержит сахар';
  } else {
    cardElement.querySelector('.card__characteristic').textContent = 'Без сахара';
  }
  cardElement.querySelector('.card__composition-list').textContent = element.contents;

  return cardElement;
};

// выводим в каталог

var catalog = getCards(26);
var fragment = document.createDocumentFragment();
for (var i = 0; i < catalog.length; i++) {
  fragment.appendChild(renderCard(catalog[i]));
}
userDialog.appendChild(fragment);

// товары в корзине

var orderCardTemplate = document.querySelector('#card-order')
    .content
    .querySelector('.goods_card');

var renderOrderCard = function (element) {
  var orderElement = orderCardTemplate.cloneNode(true);

  orderElement.querySelector('.card-order__title').textContent = element.name;
  orderElement.querySelector('.card-order__img').src = element.picture;
  orderElement.querySelector('.card-order__price').textContent = element.price + '₽';
  orderElement.querySelector('.card-order__count').value = element.amount;
  return orderElement;
};

var orderCatalog = getCards(3);
var orderContainer = document.querySelector('.goods__cards');

var orderFragment = document.createDocumentFragment();
for (var j = 0; j < orderCatalog.length; j++) {
  orderFragment.appendChild(renderOrderCard(orderCatalog[j]));
}
orderContainer.appendChild(orderFragment);

document.querySelector('.goods__cards').classList.remove('goods__cards--empty');
document.querySelector('.goods__card-empty').classList.add('visually-hidden');
