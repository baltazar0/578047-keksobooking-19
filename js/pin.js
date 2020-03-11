'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapPinsContainer = document.querySelector('.map__pins');

  var NEW_ADVERTS_NUMBER = 5;

  var renderPin = function (advert) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + advert.location.x + 'px; top: ' + advert.location.y + 'px';
    var img = pinElement.querySelector('img');
    img.src = advert.author.avatar;
    img.alt = advert.offer.title;
    return pinElement;
  };

  var getFragmentPins = function (adverts) {
    var takeNumber = adverts.length > NEW_ADVERTS_NUMBER ? NEW_ADVERTS_NUMBER : adverts.length;
    window.pin.removePinMap();
    var fragment = document.createDocumentFragment();

    var addClickListener = function (button, advert) {
      button.addEventListener('click', function () {
        window.map.openCard(advert);
      });
    };

    for (var i = 0; i < takeNumber; i++) {
      var pinElement = renderPin(adverts[i]);
      var advertNew = adverts[i];
      addClickListener(pinElement, advertNew);
      // console.log(pinElement)
      // pinElement.addEventListener('click', function () {
      //   console.log(window.card.renderCardMap(advertElement));
      // window.map.openCard(adverts[i]);

      fragment.appendChild(pinElement);
      // console.log(fragment)
    }
    // console.log(fragment)
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
