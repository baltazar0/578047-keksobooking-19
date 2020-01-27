'use strict';
var countAvatar = 8;
var countAds = 8;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 65;
var PIN_HEIGHT = 87;
// var locationСorrectX = LOCATION_X_MIN - PIN_WIDTH / 2;
var locationСorrectY = LOCATION_Y_MAX - PIN_HEIGHT;
var TYPE_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_OFFER = ['12:00', '13:00', '14:00'];
var CHECKOUT_OFFER = ['12:00', '13:00', '14:00'];
var FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

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
        price: 1000,
        type: getRandomElement(TYPE_OFFER),
        rooms: 3,
        guests: 5,
        checkin: getRandomElement(CHECKIN_OFFER),
        checkout: getRandomElement(CHECKOUT_OFFER),
        features: getRandomLengthArray(FEATURES_OFFER),
        description: 'Cтрока с описанием',
        photos: getRandomLengthArray(PHOTOS)
      },
      location: {
        x: getRandomInteger(LOCATION_X_MIN, LOCATION_X_MAX),
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
  pinElement.style.left = ad.location.x + PIN_WIDTH / 2 + 'px';
  pinElement.style.top = ad.location.y + PIN_HEIGHT + 'px';
  var img = pinElement.querySelector('img');
  img.src = ad.author.avatar;
  img.alt = ad.offer.title;
  return pinElement
}

var renderAdsList = function (ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderAdItem(ads[i]));
  }
  return fragment;
}
mapPins.appendChild(renderAdsList(getAds()))


