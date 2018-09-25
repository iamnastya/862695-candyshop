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

var getArr = function() {

  var arr = [];

  for(var i = 0; i < 26; i++) {

    arr[i] = {
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
  }

  return arr;

}

console.log(getArr());
