'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapPinsContainer = document.querySelector('.map__pins');

  var renderPin = function (advert) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + advert.location.x + 'px; top: ' + advert.location.y + 'px';
    var img = pinElement.querySelector('img');
    img.src = advert.author.avatar;
    img.alt = advert.offer.title;
    return pinElement;
  };

  var getFragmentPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(renderPin(adverts[i]));
    }
    return fragment;
  };

  var renderPinMap = function (data) {
    mapPinsContainer.appendChild(getFragmentPins(data));
  };

  var removePinMap = function () {
    var collectionPins = mapPinsContainer.querySelectorAll('.map__pin');
    for (var i = 1; i < collectionPins.length; i++) {
      mapPinsContainer.removeChild(collectionPins[i]);
    }
  };

  window.pin = {
    renderPinMap: renderPinMap,
    removePinMap: removePinMap
  };
})();
