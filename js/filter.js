'use strict';

(function () {
  var filtersMap = document.querySelector('.map__filters');
  var filterList = filtersMap.querySelectorAll('.map__filter');


  var Filter = {
    TYPE: 'housing-type',
    PRICE: 'housing-price',
    ROOMS: 'housing-rooms',
    GUESTS: 'housing-guests',
    FEATURES: 'housing-features'
  };

  var getValue = function (select) {
    var selectedValue = document.querySelector('#' + select).value;
    return selectedValue;
  };

  // var filterValue = function (arr, value, filter) {
  //   // console.log(getValue(filter))
  //   return (getValue(filter) !== 'any') ? arr.filter(function (it) {
  //     console.log(getValue(filter)); return it.offer[value] === getValue(filter);
  //   }) : arr;
  // };


  var filterValue = function (arr, value, filter) {
    if (getValue(filter) !== 'any') {
      arr = arr.filter(function (it) {
        // console.log(getValue(filter))
        return it.offer[value] === getValue(filter);
      });
    } else {
      arr = arr;
    }
    return arr;
  };

  var getFilterData = function () {
    // window.map.checkingForCard();
    // var data = null;
    var filterData = window.data.get().slice();
    // console.log(filterData)
    filterList.forEach(function (item) {
      switch (item.id) {
        case Filter.TYPE:
          filterData = filterValue(filterData, 'type', Filter.TYPE);
          break;
        case Filter.PRICE:
          // data = sortNewPhoto(window.data.get());
          break;
        // getValue(Filter.PRICE);
        case Filter.ROOMS:
          // data = sortCommentsPhoto(window.data.get());
          getValue(Filter.ROOMS);
          break;
      }
    });

    // console.log(filterData)
    return filterData;
  };

  var filterChangeHandler = function () {
    return window.pin.renderPinMap(getFilterData());
  };


  filtersMap.addEventListener('change', filterChangeHandler);


  var filterReset = function () {
    filtersMap.reset();
  };

  window.filter = {
    // changeFilter: changeFilter,
    filterReset: filterReset
  };
})();

