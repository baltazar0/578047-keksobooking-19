'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersElement = mapFilters.children;
  var PIN_DEACTIVATE_WIDTH = 65;
  var PIN_DEACTIVATE_HEIGHT = 65;

  var deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.deactivateFieldset(adFormFieldset);
    window.form.deactivateFieldset(mapFiltersElement);
    window.form.getAddressInput(mapPinMain, PIN_DEACTIVATE_WIDTH, PIN_DEACTIVATE_HEIGHT);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.activateFieldset(adFormFieldset);
    window.form.activateFieldset(mapFiltersElement);
    window.form.disabledGuestNumber();
    window.pin.renderPinMap(window.data.get());
    mapPinMain.removeEventListener('mousedown', mapPinMainClickHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    window.map.clickPin();
  };

  var mapPinMainClickHandler = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  var mapPinMainKeydownHandler = function (evt) {
    if (evt.key === window.utils.enter) {
      activatePage();
    }
  };

  mapPinMain.addEventListener('mousedown', mapPinMainClickHandler);

  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  window.mainPin = {
    deactivatePage: deactivatePage
  };
})();
