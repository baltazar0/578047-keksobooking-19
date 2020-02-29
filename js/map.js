'use strict';

(function () {
  var map = document.querySelector('.map');

  var searchCard = function () {
    return document.querySelector('.map__card');
  };

  var closeCard = function () {
    map.removeChild(searchCard());
  };

  var btnCloseClickHandler = function () {
    closeCard();
  };

  var btnEscPressHandler = function () {
    window.utils.escPress(closeCard());
  };

  var openCard = function (advert) {
    if (searchCard()) {
      closeCard();
    }
    window.card.renderCardMap(advert);
    var btnCloseCard = document.querySelector('.popup__close');
    btnCloseCard.addEventListener('click', btnCloseClickHandler);
    document.addEventListener('keydown', btnEscPressHandler);
  };

  var addClickListener = function (button, advert) {
    button.addEventListener('click', function () {
      openCard(advert);
    });
  };

  var clickPin = function () {
    var pinsCollection = map.querySelectorAll('.map__pin');
    for (var i = 1; i < pinsCollection.length; i++) {
      var pinElement = pinsCollection[i];
      addClickListener(pinElement, window.data.get()[i - 1]);
    }
  };

  window.map = {
    clickPin: clickPin
  };
})();
