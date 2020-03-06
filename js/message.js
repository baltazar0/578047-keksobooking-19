'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var escPressHandler = function (evt) {
    window.utils.escPress(evt, closePopupError);
  };
  var escPressHandlerS = function (evt) {
    window.utils.escPress(evt, closePopupSuccess);
  };

  var btnCloseClickHandler = function () {
    closePopupError();
  };

  var closePopupError = function () {
    main.removeChild(main.querySelector('.error'));
    window.mainPin.deactivatePinMain();
  };

  var closePopupSuccess = function () {
    main.removeChild(main.querySelector('.success'));
    window.mainPin.deactivatePage();
  };

  var renderPopupError = function (errorMessage) {
    var message = errorTemplate.cloneNode(true);
    message.querySelector('.error__message').textContent = errorMessage;
    var button = message.querySelector('.error__button');
    button.focus();
    button.addEventListener('click', btnCloseClickHandler);
    document.addEventListener('keydown', escPressHandler);
    main.appendChild(message);
  };

  var renderPopuSuccess = function () {
    var message = successTemplate.cloneNode(true);
    document.addEventListener('keydown', escPressHandlerS);
    main.appendChild(message);
  };

  window.message = {
    renderPopupError: renderPopupError,
    renderPopuSuccess: renderPopuSuccess
  };
})();
