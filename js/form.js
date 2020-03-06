'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  // var adFormFieldset = adForm.querySelectorAll('fieldset');
  var inputAddress = adForm.querySelector('#address');
  var inputPrice = adForm.querySelector('#price');
  var inputType = adForm.querySelector('#type');
  var inputTimeIn = adForm.querySelector('#timein');
  var inputTimeOut = adForm.querySelector('#timeout');
  var buttonReset = adForm.querySelector('.ad-form__reset');
  // var mapFilters = document.querySelector('.map__filters');
  // var mapFiltersElement = mapFilters.children;
  // var PIN_WIDTH = 50;
  // var PIN_HEIGHT = 70;
  var mapPinMain = document.querySelector('.map__pin--main');
  var MAIN_PIN_DEACTIVATE_WIDTH = 65;
  var MAIN_PIN_DEACTIVATE_HEIGHT = 65;
  var DEFAULT_COORDINATES = 'left: 570px; top: 375px;';
  var DEFAULT_PLACEHOLDER = '5000';

  var roomNumber = adForm.querySelector('#room_number');
  var guestNumber = adForm.querySelector('#capacity');
  var CAPACITIY_THREE_GUESTS_VALUE = '3';
  var CAPACITIY_TWO_GUESTS_VALUE = '2';
  var CAPACITIY_ONE_GUEST_VALUE = '1';
  var CAPACITIY_NONE_GUESTS_VALUE = '0';
  var capacityListMap = {
    '1': [CAPACITIY_ONE_GUEST_VALUE],
    '2': [CAPACITIY_ONE_GUEST_VALUE, CAPACITIY_TWO_GUESTS_VALUE],
    '3': [CAPACITIY_ONE_GUEST_VALUE, CAPACITIY_TWO_GUESTS_VALUE, CAPACITIY_THREE_GUESTS_VALUE],
    '100': [CAPACITIY_NONE_GUESTS_VALUE]
  };

  var MinPriceHousing = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var getCurrentOptionValue = function (select) {
    return select.options[select.selectedIndex].value;
  };

  var getMinPrice = function () {
    inputPrice.min = MinPriceHousing[getCurrentOptionValue(inputType)];
    inputPrice.placeholder = inputPrice.min;
  };

  inputType.addEventListener('change', function () {
    getMinPrice();
  });

  inputTimeIn.addEventListener('change', function () {
    inputTimeOut.value = inputTimeIn.value;
  });

  inputTimeOut.addEventListener('change', function () {
    inputTimeIn.value = inputTimeOut.value;
  });

  var getAddressInput = function (elem, width, height) {
    var elemCoordX = Math.round(elem.offsetLeft + width / 2);
    var elemCoordY = Math.round(elem.offsetTop + height);

    inputAddress.value = elemCoordX + ' : ' + elemCoordY;
    return inputAddress.value;
  };

  var disabledSelect = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr.options[i].style = 'display: none';
    }
  };

  var disabledGuestNumber = function () {
    disabledSelect(guestNumber);
    guestNumber.options[guestNumber.selectedIndex].style = 'display: block';
  };


  var getGuestNumberValue = function (number) {
    return capacityListMap[number];
  };

  roomNumber.addEventListener('change', function () {
    disabledSelect(guestNumber);
    var currentRoomsNumber = getCurrentOptionValue(roomNumber);
    var currentArrGuest = getGuestNumberValue(currentRoomsNumber);
    for (var i = 0; i < currentArrGuest.length; i++) {
      for (var j = 0; j < guestNumber.length; j++) {
        if (currentArrGuest[i] === guestNumber.options[j].value) {
          guestNumber.options[j].style = 'display: block';
          if (guestNumber.options[j].value !== CAPACITIY_NONE_GUESTS_VALUE) {
            guestNumber.options[2].selected = true;
          } else {
            guestNumber.options[3].selected = true;
          }
        }
      }
    }
  });

  var deactivateFieldset = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = 'disabled';
    }
  };

  var activateFieldset = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = false;
    }
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), function () {
      window.mainPin.deactivatePage();
      window.message.renderPopuSuccess();
    }, function (errorMessage) {
      window.message.renderPopupError(errorMessage);
    });
    evt.preventDefault();
  });

  var formReset = function () {
    adForm.reset();
    mapPinMain.style = DEFAULT_COORDINATES;
    getAddressInput(mapPinMain, MAIN_PIN_DEACTIVATE_WIDTH, MAIN_PIN_DEACTIVATE_HEIGHT);
    inputPrice.placeholder = DEFAULT_PLACEHOLDER;
  };

  var formResetClickHandler = function () {
    window.mainPin.deactivatePage();
  };

  buttonReset.addEventListener('click', formResetClickHandler);

  window.form = {
    activateFieldset: activateFieldset,
    deactivateFieldset: deactivateFieldset,
    getAddressInput: getAddressInput,
    disabledGuestNumber: disabledGuestNumber,
    formReset: formReset
  };

})();
