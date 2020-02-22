'use strict';

(function () {
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
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var DESCRIPTION = ['Cтрока с описанием 1', 'Cтрока с описанием 2', 'Cтрока с описанием 3', 'Cтрока с описанием 4', 'Cтрока с описанием 5', 'Cтрока с описанием 6', 'Cтрока с описанием 7', 'Cтрока с описанием 8'];
  var PRICE = 1000;
  var ROOMS = 3;
  var GUESTS = 5;
  var CHECKIN_OFFER = ['12:00', '13:00', '14:00'];
  var CHECKOUT_OFFER = ['12:00', '13:00', '14:00'];
  var FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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
      x: window.utils.getRandomInteger(LOCATION_X_MIN, LOCATION_X_MAX - PIN_WIDTH / 2),
      y: window.utils.getRandomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX - PIN_HEIGHT)
    };
  };


  var getAdvert = function (number) {
    var locationPin = getLocation();
    var advert = {
      author: {
        avatar: getAvatars()[number]
      },
      offer: {
        title: window.utils.getRandomElement(TITLE),
        address: locationPin.x + ', ' + locationPin.y,
        price: PRICE,
        type: window.utils.getRandomElement(TYPES_OFFER),
        rooms: ROOMS,
        guests: GUESTS,
        checkin: window.utils.getRandomElement(CHECKIN_OFFER),
        checkout: window.utils.getRandomElement(CHECKOUT_OFFER),
        features: window.utils.getRandomLengthArray(FEATURES_OFFER),
        description: window.utils.getRandomElement(DESCRIPTION),
        photos: window.utils.getRandomLengthArray(PHOTOS)
      },
      location: {
        x: locationPin.x,
        y: locationPin.y
      }
    };
    return advert;
  };

  var getAdverts = function () {
    var adverts = [];
    for (var i = 0; i < COUNT_ADS; i++) {
      var advert = getAdvert(i);
      adverts.push(advert);
    }
    return adverts;
  };

  // var getAdverts = function () {
  //   var adverts = [];
  //   for (var i = 0; i < COUNT_ADS; i++) {
  //     var locationPin = getLocation();
  //     var advert = {
  //       author: {
  //         avatar: getAvatars()[i]
  //       },
  //       offer: {
  //         title: window.utils.getRandomElement(TITLE),
  //         address: locationPin.x + ', ' + locationPin.y,
  //         price: PRICE,
  //         type: window.utils.getRandomElement(TYPES_OFFER),
  //         rooms: ROOMS,
  //         guests: GUESTS,
  //         checkin: window.utils.getRandomElement(CHECKIN_OFFER),
  //         checkout: window.utils.getRandomElement(CHECKOUT_OFFER),
  //         features: window.utils.getRandomLengthArray(FEATURES_OFFER),
  //         description: window.utils.getRandomElement(DESCRIPTION),
  //         photos: window.utils.getRandomLengthArray(PHOTOS)
  //       },
  //       location: {
  //         x: locationPin.x,
  //         y: locationPin.y
  //       }
  //     };
  //     adverts.push(advert);
  //   }
  //   return adverts;
  // };

  window.data = {
    getAdverts: getAdverts
  };
})();
