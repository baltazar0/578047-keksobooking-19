'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersElement = mapFilters.children;
  var mapPinsContainer = document.querySelector('.map__pins');
  var PIN_DEACTIVATE_WIDTH = 65;
  var PIN_DEACTIVATE_HEIGHT = 65;

  var deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.deactivateFieldset(adFormFieldset);
    window.form.deactivateFieldset(mapFiltersElement);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.activateFieldset(adFormFieldset);
    window.form.activateFieldset(mapFiltersElement);
    window.form.disabledGuestNumber();
    mapPinsContainer.appendChild(window.pin.getFragmentPins(window.data.getAdverts()));
    mapPinMain.removeEventListener('mousedown', mapPinMainClickHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    window.map.clickPin();
  };

  document.addEventListener('DOMContentLoaded', function () {
    deactivatePage();
    window.form.getAddressInput(mapPinMain, PIN_DEACTIVATE_WIDTH, PIN_DEACTIVATE_HEIGHT);
  });

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

})();
