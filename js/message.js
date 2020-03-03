'use strict';

(function () {
  var main = document.querySelector('main');
  var errMessage = 'Данные не получены, перезагрузите страницу';
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var escPressHandler = function (evt) {
    window.utils.escPress(evt, closePopupError); 
  };

  var btnCloseClickHandler = function () {
    closePopupError(); 
  };

  var closePopupError = function () {
    main.removeChild(main.querySelector('.error'));
    window.mainPin.deactivatePage();
    createMessage(errMessage);
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

  // editFormCloseElement.addEventListener('keydown', function (evt) {
  //   window.utils.isEnterEvent(evt, closeEditForm);
  // });

  // var renderCardSuccess = function (successMessage) {
  //   var message = successTemplate.cloneNode(true);
  //   message.querySelector('.success__message').textContent = successMessage;
  //   return message;
  // };

  // var renderMessage = function (message) {
  //   var fragment = document.createDocumentFragment();
  //   fragment = renderCardError(message);
  //   return main.appendChild(fragment);
  // };

  // var renderMessage = function (message) {
  //   document.body.insertBefore(message, document.body.children[0]);
  // };


  var createMessage = function (message) {
    var node = document.createElement('div');
    node.className = 'error-banner';
    node.style = 'z-index: 100; margin: 30px auto; text-align: center; color: white; background-color: red';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
    var func = function () {
      node.parentNode.removeChild(node);
    };
    window.setTimeout(func, 5000);
  };

  window.message = {
    renderPopupError: renderPopupError
  };
})();
