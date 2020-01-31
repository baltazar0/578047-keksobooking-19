'use strict';

var COUNT_ADS = 8;
var COUNT_AVATARS = 8;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var TITLE = ['Заголовок объявления 1', 'Заголовок объявления 2', 'Заголовок объявления 3', 'Заголовок объявления 4', 'Заголовок объявления 5', 'Заголовок объявления 6', 'Заголовок объявления 7', 'Заголовок объявления 8']
var TYPES_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var TypesRu = {
  palace: 'Дворец ',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var CHECKIN_OFFER = ['12:00', '13:00', '14:00'];
var CHECKOUT_OFFER = ['12:00', '13:00', '14:00'];
var FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var DESCRIPTION = ['Cтрока с описанием 1', 'Cтрока с описанием 2', 'Cтрока с описанием 3', 'Cтрока с описанием 4', 'Cтрока с описанием 5', 'Cтрока с описанием 6', 'Cтрока с описанием 7', 'Cтрока с описанием 8']
var PRICE = 1000;
var ROOMS = 3;
var GUESTS = 5;
var map = document.querySelector('.map');
// var popup = document.querySelector('.popup');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
};

var getRandomLengthArray = function (arr) {
  var newArr = [];
  var randomLength = getRandomInteger(1, arr.length);
  for (var i = 0; i < randomLength; i++) {
    var element = arr[i];
    newArr.push(element);
  }
  return newArr;
};

var getAvatars = function () {
  var arr = [];
  for (var i = 1; i <= COUNT_AVATARS; i++) {
    var element = 'img/avatars/user0' + i + '.png';
    arr.push(element);
  }
  return arr;
};

var getLocation = function () {
  return {
    x: getRandomInteger(LOCATION_X_MIN, LOCATION_X_MAX - PIN_WIDTH / 2),
    y: getRandomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX - PIN_HEIGHT)
  }
};

var getAdverts = function () {
  var adverts = [];
  for (var i = 0; i < COUNT_ADS; i++) {
    var locationPin = getLocation();
    var advert = {
      author: {
        avatar: getAvatars()[i]
      },
      offer: {
        title: getRandomElement(TITLE),
        address: locationPin.x + ', ' + locationPin.y,
        price: PRICE,
        type: getRandomElement(TYPES_OFFER),
        rooms: ROOMS,
        guests: GUESTS,
        checkin: getRandomElement(CHECKIN_OFFER),
        checkout: getRandomElement(CHECKOUT_OFFER),
        features: getRandomLengthArray(FEATURES_OFFER),
        description: getRandomElement(DESCRIPTION),
        photos: getRandomLengthArray(PHOTOS)
      },
      location: {
        x: locationPin.x,
        y: locationPin.y
      }
    };
    adverts.push(advert);
  }
  return adverts;
};

map.classList.remove('map--faded');

var renderPin = function (advert) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + advert.location.x + 'px; top: ' + advert.location.y + 'px';
  var img = pinElement.querySelector('img');
  img.src = advert.author.avatar;
  img.alt = advert.offer.title;
  return pinElement;
};

var renderPinMap = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  return fragment;
};

mapPins.appendChild(renderPinMap(getAdverts()));


var translateIntoRus = function (obj, param) {
  var element;
  for (var key in obj) {
    if (key === param) {
      element = obj[key];
      break;
    } else {
      element = param;
    }
  }
  return element;
};


var renderCardItem = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);
  // for (var i = 0; i < cardElement.children.length; i++) {

  //   if (cardElement.children[i].textContent === undefined) {
  //     cardElement.children.style = none;
  //   }
  // }
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';

  // русифицирование типа оффера
  cardElement.querySelector('.popup__type').textContent = translateIntoRus(TypesRu, ad.offer.type);


  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  
  // добавление фич в список
  var featuresCard = cardElement.querySelector('.popup__features');
  var featuresList = featuresCard.querySelectorAll('.popup__feature');
  var arrFeatures = ad.offer.features;
  // featuresCard.innerHTML = '';
  while (featuresCard.children.length > 0) {
    featuresCard.removeChild(featuresCard.children[0]);
  }
  for (var i = 0; i < arrFeatures.length; i++) {
    if (featuresList[i].classList.contains('popup__feature--' + arrFeatures[i])) {
      featuresList[i].textContent = arrFeatures[i];
      featuresCard.appendChild(featuresList[i]);
    }
  }

  // добавление рандомного кол-ва фото;
  var photosCard = cardElement.querySelector('.popup__photos');
  var photoCard = cardElement.querySelector('.popup__photo');
  var arrPhotos = ad.offer.photos;
  photosCard.innerHTML = '';
  // photosCard.removeChild(photosCard.children[0]);
  for (var i = 0; i < arrPhotos.length; i++) {
    var clone = photoCard.cloneNode();
    clone.src = arrPhotos[i];
    photosCard.appendChild(clone);
  }

  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  return cardElement;
};

map.appendChild(renderCardItem(getAdverts()[4]));
