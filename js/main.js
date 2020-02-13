'use strict';

var COUNT_ADS = 8;
var COUNT_AVATARS = 8;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var TITLE = ['Заголовок объявления 1', 'Заголовок объявления 2', 'Заголовок объявления 3', 'Заголовок объявления 4', 'Заголовок объявления 5', 'Заголовок объявления 6', 'Заголовок объявления 7', 'Заголовок объявления 8'];
var TYPES_OFFER = ['palace', 'flat', 'house', 'bungalo'];
// var TypesRu = {
//   palace: 'Дворец ',
//   flat: 'Квартира',
//   house: 'Дом',
//   bungalo: 'Бунгало'
// };
var CHECKIN_OFFER = ['12:00', '13:00', '14:00'];
var CHECKOUT_OFFER = ['12:00', '13:00', '14:00'];
var FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var DESCRIPTION = ['Cтрока с описанием 1', 'Cтрока с описанием 2', 'Cтрока с описанием 3', 'Cтрока с описанием 4', 'Cтрока с описанием 5', 'Cтрока с описанием 6', 'Cтрока с описанием 7', 'Cтрока с описанием 8'];
var PRICE = 1000;
var ROOMS = 3;
var GUESTS = 5;
// var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var inputAddress = adForm.querySelector('#address');
var roomNumber = adForm.querySelector('#room_number');
var guestNumber = adForm.querySelector('#capacity');
var CAPACITIY_THREE_GUESTS_VALUE = '3';
var CAPACITIY_TWO_GUESTS_VALUE = '2';
var CAPACITIY_ONE_GUEST_VALUE = '1';
var CAPACITIY_NONE_GUESTS_VALUE = '0';
var capacityListMap = {
  '1': [CAPACITIY_ONE_GUEST_VALUE],
  '2': [CAPACITIY_ONE_GUEST_VALUE, CAPACITIY_TWO_GUESTS_VALUE],
  '3': [CAPACITIY_ONE_GUEST_VALUE, CAPACITIY_TWO_GUESTS_VALUE, CAPACITIY_THREE_GUESTS_VALUE],
  '100': [CAPACITIY_NONE_GUESTS_VALUE]
};
var mapFilters = document.querySelector('.map__filters');
var mapFiltersElement = mapFilters.children;
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
// var cardTemplate = document.querySelector('#card')
//   .content
//   .querySelector('.map__card');

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
  };
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

// var renderElements = function (box, element) {
//   box.appendChild(element);
// };


// mapPins.appendChild(renderPinMap(getAdverts()));

// var translateIntoRus = function (obj, type) {
//   var element;
//   for (var key in obj) {
//     if (key === type) {
//       element = obj[key];
//       break;
//     } else {
//       element = type;
//     }
//   }
//   return element;
// };
// var renderFeaturesCard = function (feature, parent) {
//   parent.innerHTML = '';
//   var featuresFragment = document.createDocumentFragment();
//   for (var i = 0; i < feature.length; i++) {
//     var featureItem = document.createElement('li');
//     featureItem.className = 'popup__feature popup__feature--' + feature[i];
//     featureItem.textContent = feature[i];
//     featuresFragment.appendChild(featureItem);
//   }
//   return parent.appendChild(featuresFragment);
// };

// var renderPhotosCard = function (photo, parent) {
//   var child = parent.children[0];
//   parent.innerHTML = '';
//   var photosFragment = document.createDocumentFragment();
//   for (var i = 0; i < photo.length; i++) {
//     var clone = child.cloneNode();
//     clone.src = photo[i];
//     photosFragment.appendChild(clone);
//   }
//   return parent.appendChild(photosFragment);
// };

// var renderCardItem = function (advert) {
//   var cardElement = cardTemplate.cloneNode(true);

//   var renderElementContent = function (className, data) {
//     var el = cardElement.querySelector(className);
//     if (data) {
//       el.textContent = data;
//     } else {
//       el.remove();
//     }
//   };

//   renderElementContent('.popup__title', advert.offer.title);
//   renderElementContent('.popup__text--address', advert.offer.address);
//   renderElementContent('.popup__text--price', advert.offer.price + ' ₽/ночь');
//   renderElementContent('.popup__type', translateIntoRus(TypesRu, advert.offer.type));
//   renderElementContent('.popup__text--capacity', advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей');
//   renderElementContent('.popup__text--time', 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout);
//   renderElementContent('.popup__description', advert.offer.description);

//   renderFeaturesCard(advert.offer.features, cardElement.querySelector('.popup__features'));
//   renderPhotosCard(advert.offer.photos, cardElement.querySelector('.popup__photos'));
//   cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
//   return cardElement;
// };

// map.appendChild(renderCardItem(getAdverts()[4]));

var deactivateFieldset = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].disabled = 'disabled';
  }
};

var activateFieldset = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].disabled = false;
  }
};

var getAddressInput = function (elem) {
  var xy = elem.getBoundingClientRect();
  return Math.round(xy.left + pageXOffset + PIN_WIDTH / 2) + ' : ' + Math.round(xy.top + pageYOffset + PIN_HEIGHT);
};

var deactivatePage = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  deactivateFieldset(adFormFieldset);
  deactivateFieldset(mapFiltersElement);
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  activateFieldset(adFormFieldset);
  activateFieldset(mapFiltersElement);
  disabledSelect(guestNumber);
  guestNumber.options[guestNumber.selectedIndex].style = 'display: block';
  mapPins.appendChild(renderPinMap(getAdverts()));
  mapPinMain.removeEventListener('mousedown', mapPinMainClickHandler);
  mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
};

document.addEventListener('DOMContentLoaded', function () {
  deactivatePage();
  inputAddress.value = getAddressInput(mapPinMain);
});

var mapPinMainClickHandler = function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
};

var mapPinMainKeydownHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
  }
};

mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);

mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

var getCurrentOptionValue = function (select) {
  return select.options[select.selectedIndex].value;
};

var disabledSelect = function (arr) {
  for (var i = 0; i < guestNumber.length; i++) {
    arr.options[i].style = 'display: none';
  }
};

var getGuestNumberValue = function (number) {
  return capacityListMap[number];
};

roomNumber.addEventListener('change', function () {
  disabledSelect(guestNumber);
  var currentRoomsNumber = getCurrentOptionValue(roomNumber);
  var currentArrGuest = getGuestNumberValue(currentRoomsNumber);
  for (var i = 0; i < currentArrGuest.length; i++) {
    for (var j = 0; j < guestNumber.length; j++) {
      if (currentArrGuest[i] === guestNumber.options[j].value) {
        guestNumber.options[j].style = 'display: block';
        if (guestNumber.options[j].value !== CAPACITIY_NONE_GUESTS_VALUE) {
          guestNumber.options[2].selected = true;
        } else {
          guestNumber.options[3].selected = true;
        }
      }
    }
  }
});
