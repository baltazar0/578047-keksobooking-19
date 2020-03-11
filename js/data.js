'use strict';

(function () {
  var setAdverts = [];
  window.data = {
    set: function (adverts) {
      setAdverts = adverts;
    },
    get: function () {
      // console.log(setAdverts)
      return setAdverts;
    }
  };
})();
