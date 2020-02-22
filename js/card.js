'use strict';

(function () {

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var TypesRu = {
    palace: 'Дворец ',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var translateIntoRus = function (obj, type) {
    var element;
    for (var key in obj) {
      if (key === type) {
        element = obj[key];
        break;
      } else {
        element = type;
      }
    }
    return element;
  };

  var renderFeaturesCard = function (feature, parent) {
    parent.innerHTML = '';
    var featuresFragment = document.createDocumentFragment();
    for (var i = 0; i < feature.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + feature[i];
      featureItem.textContent = feature[i];
      featuresFragment.appendChild(featureItem);
    }
    return parent.appendChild(featuresFragment);
  };

  var renderPhotosCard = function (photo, parent) {
    var child = parent.children[0];
    parent.innerHTML = '';
    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < photo.length; i++) {
      var clone = child.cloneNode();
      clone.src = photo[i];
      photosFragment.appendChild(clone);
    }
    return parent.appendChild(photosFragment);
  };

  var renderCardItem = function (advert) {
    var cardElement = cardTemplate.cloneNode(true);

    var renderElementContent = function (className, data) {
      var el = cardElement.querySelector(className);
      if (data) {
        el.textContent = data;
      } else {
        el.remove();
      }
    };
    renderElementContent('.popup__title', advert.offer.title);
    renderElementContent('.popup__text--address', advert.offer.address);
    renderElementContent('.popup__text--price', advert.offer.price + ' ₽/ночь');
    renderElementContent('.popup__type', translateIntoRus(TypesRu, advert.offer.type));
    renderElementContent('.popup__text--capacity', advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей');
    renderElementContent('.popup__text--time', 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout);
    renderElementContent('.popup__description', advert.offer.description);
    renderFeaturesCard(advert.offer.features, cardElement.querySelector('.popup__features'));
    renderPhotosCard(advert.offer.photos, cardElement.querySelector('.popup__photos'));
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
    return cardElement;
  };

  var renderCardMap = function (advert) {
    var fragment = document.createDocumentFragment();
    fragment = renderCardItem(advert);
    return map.insertBefore(fragment, document.querySelector('.map__filters-container'));
  };

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    map.removeChild(card);
  };

  var btnCloseClickHandler = function () {
    closeCard();
  };

  var btnEscPressHandler = function () {
    window.utils.escPress(closeCard());
  };

  var openCard = function (advert) {
    var card = document.querySelector('.map__card');
    if (card) {
      closeCard();
    }
    renderCardMap(advert);
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
      addClickListener(pinElement, window.data.getAdverts()[i - 1]);
    }
  };

  window.card = {
    clickPin: clickPin
  };
})();
