'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  // var adFormFieldset = adForm.querySelectorAll('fieldset');
  var inputAddress = adForm.querySelector('#address');
  // var mapFilters = document.querySelector('.map__filters');
  // var mapFiltersElement = mapFilters.children;
  // var PIN_WIDTH = 50;
  // var PIN_HEIGHT = 70;
  // var mapPinMain = document.querySelector('.map__pin--main');
  // var PIN_DEACTIVATE_WIDTH = 65;
  // var PIN_DEACTIVATE_HEIGHT = 65;

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

  var submit = document.querySelector('.ad-form__submit');

  var getAddressInput = function (elem, width, height) {
    var xy = elem.getBoundingClientRect();
    return (inputAddress.value = Math.round(xy.left + pageXOffset + width / 2) + ' : ' + Math.round(xy.top + pageYOffset + height));
  };


  var getCurrentOptionValue = function (select) {
    return select.options[select.selectedIndex].value;
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

  submit.addEventListener('submit', function (evt) {
    // evt.preventDefault();
    window.backend.save(new FormData(adForm), function (response) {
        console.log('Данные отправлены');
      },
      function (error) {
        console.log('Данные не отправлены');
        // window.message.renderPopupError(error);
      });
  });

  window.form = {
    activateFieldset: activateFieldset,
    deactivateFieldset: deactivateFieldset,
    getAddressInput: getAddressInput,
    // coordMainPin: coordMainPin,
    disabledGuestNumber: disabledGuestNumber
  };

})();
