'use strict';

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    window.backend.load(function (data) {
      window.data.set(data);
      window.mainPin.deactivatePage();
    }, function (errorMessage) {
      window.message.renderPopupError(errorMessage);
      window.mainPin.dataGetError();
    });
  });
})();
