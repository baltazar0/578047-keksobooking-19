'use strict';

(function () {
  // var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

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


  window.pin = {
    getFragmentPins: getFragmentPins,
    renderPin: renderPin
  };
})();
