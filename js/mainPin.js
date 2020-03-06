'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersElement = mapFilters.children;

  var deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.pin.removePinMap();
    window.form.formReset();
    window.form.deactivateFieldset(adFormFieldset);
    window.form.deactivateFieldset(mapFiltersElement);
    activatePinMain();
    window.move.dragPin();
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.activateFieldset(adFormFieldset);
    window.form.activateFieldset(mapFiltersElement);
    window.form.disabledGuestNumber();
    window.pin.renderPinMap(window.data.get());
    window.map.clickPin();
    deactivatePinMain();
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

  var activatePinMain = function () {
    mapPinMain.addEventListener('mousedown', pinMainClickHandler);
    mapPinMain.addEventListener('keydown', pinMainKeydownHandler);
  };

  var deactivatePinMain = function () {
    mapPinMain.removeEventListener('mousedown', pinMainClickHandler);
    mapPinMain.removeEventListener('keydown', pinMainKeydownHandler);
  };

  window.mainPin = {
    activatePinMain: activatePinMain,
    deactivatePinMain: deactivatePinMain,
    mapPinMain: mapPinMain,
    deactivatePage: deactivatePage
  };
})();
