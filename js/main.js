'use strict';

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    window.backend.load(function (data) {
      window.data.set(data);
      window.mainPin.deactivatePage();
      window.mainPin.activatePinMain();
    }, function (errorMessage) {
      window.message.renderPopupError(errorMessage);
      window.mainPin.deactivatePinMain();
      window.mainPin.deactivatePage();
      window.move.removeDragPin();
    });
  });
})();
