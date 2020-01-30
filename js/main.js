'use strict';
var countAvatar = 8;
var countAds = 8;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var locationСorrectX = LOCATION_X_MAX - PIN_WIDTH / 2;
var locationСorrectY = LOCATION_Y_MAX - PIN_HEIGHT;
var TYPE_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_OFFER = ['12:00', '13:00', '14:00'];
var CHECKOUT_OFFER = ['12:00', '13:00', '14:00'];
var FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var DESCRIPTION = 'Cтрока с описанием';
var PRICE = 1000;
var ROOMS = 3;
var GUESTS = 5;
var map = document.querySelector('.map');
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
  for (var i = 1; i <= countAvatar; i++) {
    var count = '0' + i;
    var element = 'img/avatars/user' + count + '.png';
    arr.push(element);
  }
  return arr;
};

var getAds = function () {
  var ads = [];
  for (var i = 0; i < countAds; i++) {
    var ad = {
      author: {
        avatar: getAvatars()[i]
      },
      offer: {
        title: 'Заголовок объявления',
        address: '600, 350',
        price: PRICE,
        type: getRandomElement(TYPE_OFFER),
        rooms: ROOMS,
        guests: GUESTS,
        checkin: getRandomElement(CHECKIN_OFFER),
        checkout: getRandomElement(CHECKOUT_OFFER),
        features: getRandomLengthArray(FEATURES_OFFER),
        description: DESCRIPTION,
        photos: getRandomLengthArray(PHOTOS)
      },
      location: {
        x: getRandomInteger(LOCATION_X_MIN, locationСorrectX),
        y: getRandomInteger(LOCATION_Y_MIN, locationСorrectY)
      }
    };
    ads.push(ad);
  }
  return ads;
};

map.classList.remove('map--faded');

var renderAdItem = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x + 'px';
  pinElement.style.top = ad.location.y + 'px';
  var img = pinElement.querySelector('img');
  img.src = ad.author.avatar;
  img.alt = ad.offer.title;
  return pinElement;
};

var renderAdsList = function (ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderAdItem(ads[i]));
  }
  return fragment;
};

mapPins.appendChild(renderAdsList(getAds()));

var renderCardItem = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = ad.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = ad.offer.features;
  var description1 = cardElement.querySelector('.popup__description');
  if (description1.textContent === undefined) {
    description1.style = none;
  } else {
    description1.textContent = ad.offer.description;
  }
  var imgs = cardElement.querySelector('.popup__photos');
  var img = cardElement.querySelector('.popup__photo');
  var array = ad.offer.photos;
  if (array.length === 1) {
    img.src = ad.offer.photos;
  } else {
    img.src = ad.offer.photos[0];
    for (var i = 1; i < array.length; i++) {
      var clone = img.cloneNode();
      clone.src = ad.offer.photos[i];
      imgs.appendChild(clone);
    }
  }
  console.log(imgs.innerHTML)
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  return cardElement;
};

map.appendChild(renderCardItem(getAds()[4]));

