'use strict'

var nameArr = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'];

  var pictureArr = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg']


  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }


  var contentsArr = ['молоко',
    'сливки',
    'вода',
    'пищевой краситель',
    'патока',
    'ароматизатор бекона',
    'ароматизатор свинца',
    'ароматизатор дуба, идентичный натуральному',
    'ароматизатор картофеля',
    'лимонная кислота',
    'загуститель',
    'эмульгатор',
    'консервант: сорбат калия',
    'посолочная смесь: соль, нитрит натрия',
    'ксилит',
    'карбамид',
    'вилларибо',
    'виллабаджо'];

    var getContents = function () {
    var contents = "";
    for (var i = 0; i < randomInteger(1, contentsArr.length-1); i++) {
      if (i == 0) {
        contents = contentsArr[randomInteger(0,contentsArr.length-1)];
      } else {
        contents = contents + ", " + contentsArr[randomInteger(0,contentsArr.length-1)];
      }
    }
    return contents
  }

  var userDialog = document.querySelector('.catalog__cards');
  userDialog.classList.remove('catalog__cards--load');
  userDialog.querySelector('.catalog__load').classList.add('visually-hidden');

  var cardsTemplate = document.querySelector('#card')
    .content
    .querySelector('.catalog__card');

  var getCards = function (){
  var cardsElement = cardsTemplate.cloneNode(true);

    var arr = {
      name: nameArr[randomInteger(0, nameArr.length - 1)],
      picture: pictureArr[randomInteger(0, pictureArr.length - 1)],
      amount: randomInteger(0,20),
      price: randomInteger(100, 1500),
      weight: randomInteger(30, 300),
      rating: {
        value: randomInteger(1,5),
        number: randomInteger(10, 900)
      },
        nutritionFacts: {
        sugar: Math.random() >= 0.5,
        energy: randomInteger(70, 500),
        contents: getContents
        }
      }

      if(arr.amount > i && arr.amount < 5) {
        cardsElement.classList.add('card--little');
        cardsElement.classList.remove('card--in-stock');
      } else if(arr.amount == 0) {
        cardsElement.classList.add('card--soon');
        cardsElement.classList.remove('card--in-stock');
      };

      cardsElement.querySelector('.card__title').textContent = arr.name;
      cardsElement.querySelector('.card__price').innerHTML = '{{price}} <span class="card__currency">₽</span><span class="card__weight">/ {{weight}} Г</span>;';
      cardsElement.querySelector('.star__count').textContent = arr.rating.number;

      cardsElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
      if(arr.rating.value === 1) {
        cardsElement.querySelector('.stars__rating').classList.add('stars__rating--one');
        if(arr.rating.value === 2) {
          cardsElement.querySelector('.stars__rating').classList.add('stars__rating--two');
        };
        if(arr.rating.value === 3) {
          cardsElement.querySelector('.stars__rating').classList.add('stars__rating--three');
        };
        if(arr.rating.value === 4) {
          cardsElement.querySelector('.stars__rating').classList.add('stars__rating--four');
        };
        if(arr.rating.value === 5) {
          cardsElement.querySelector('.stars__rating').classList.add('stars__rating--five');
        };
      }

      if(nutritionFacts.sugar){
        cardsElement.querySelector('.card__characteristic').textContent = 'Содержит сахар';
      } else {ardsElement.querySelector('.card__characteristic').textContent = 'Без сахара'};
      cardsElement.querySelector('.card__composition-list').textContent = arr.contents;
  }

var fragment = document.createDocumentFragment();
for (var i = 0; i < 26; i++) {
  fragment.appendChild(getCards(arr[i]));
}



