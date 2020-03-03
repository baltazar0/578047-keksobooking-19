'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersElement = mapFilters.children;
  var MAIN_PIN_DEACTIVATE_WIDTH = 65;
  var MAIN_PIN_DEACTIVATE_HEIGHT = 65;

  var deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.deactivateFieldset(adFormFieldset);
    window.form.deactivateFieldset(mapFiltersElement);
    window.form.getAddressInput(mapPinMain, MAIN_PIN_DEACTIVATE_WIDTH, MAIN_PIN_DEACTIVATE_HEIGHT); 
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.move.dragPin(mapPinMain);
    window.form.activateFieldset(adFormFieldset);
    window.form.activateFieldset(mapFiltersElement);
    window.form.disabledGuestNumber();
    window.pin.renderPinMap(window.data.get());    
    window.map.clickPin();
    mapPinMain.removeEventListener('mousedown', pinMainClickHandler);
    mapPinMain.removeEventListener('keydown', pinMainKeydownHandler);
  };

  var pinMainClickHandler = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  var pinMainKeydownHandler = function (evt) {
    if (evt.key === window.utils.enter) {
      activatePage();
    }
  };

  mapPinMain.addEventListener('mousedown', pinMainClickHandler);

  mapPinMain.addEventListener('keydown', pinMainKeydownHandler);

  var dataGetError = function () {
    mapPinMain.removeEventListener('mousedown', pinMainClickHandler);
    mapPinMain.removeEventListener('keydown', pinMainKeydownHandler);
  };

  window.mainPin = {
    deactivatePage: deactivatePage,
    dataGetError: dataGetError
  };
})();
