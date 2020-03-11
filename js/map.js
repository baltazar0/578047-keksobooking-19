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

  var escPressHandler = function (evt) {
    window.utils.escPress(evt, closeCard);
  };

  var checkingForCard = function () {
    if (searchCard()) {
      closeCard();
    }
  };

  var openCard = function (advert) {
    checkingForCard();
    window.card.renderCardMap(advert);
    var btnCloseCard = document.querySelector('.popup__close');
    btnCloseCard.addEventListener('click', btnCloseClickHandler);
    document.addEventListener('keydown', escPressHandler);
    btnCloseCard.focus();
  };

  window.map = {
    checkingForCard: checkingForCard,
    openCard: openCard,
    closeCard: closeCard
  };
})();
