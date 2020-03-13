'use strict';

(function () {
  var filtersMap = document.querySelector('.map__filters');
  // var filterList = filtersMap.querySelectorAll('.map__filter');
  var featuresList = Array.from(filtersMap.querySelectorAll('input[type="checkbox"]'));


  var PriceRange = {
    MIN: 10000,
    MAX: 50000
  };

  var Filter = {
    TYPE: 'housing-type',
    PRICE: 'housing-price',
    ROOMS: 'housing-rooms',
    GUESTS: 'housing-guests',
    FEATURES: 'housing-features'
  };

  var getPriceRange = function (price) {
    var value = '';
    if (price < PriceRange.MIN) {
      value = 'low';
    } else if (price >= PriceRange.MIN && price < PriceRange.MAX) {
      value = 'middle';
    } else if (price >= PriceRange.MAX) {
      value = 'high';
    }
    return value;
  };

  var filterValuePrice = function (arr, value, filter) {
    if (getValue(filter) !== 'any') {
      arr = arr.filter(function (it) {
        return getPriceRange(it.offer[value]) === getValue(filter);
      });
    }
    return arr;
  };

  var getValue = function (select) {
    var selectedValue = document.querySelector('#' + select).value;
    return selectedValue;
  };

  var filterValue = function (arr, value, filter) {
    return (getValue(filter) !== 'any') ? arr.filter(function (it) {
      return String(it.offer[value]) === getValue(filter);
    }) : arr;
  };


  var getFeaturesChecked = function (arr) {
    var featuresChecked = [];
    arr.forEach(function (it) {
      if (it.checked) {
        console.log(it.checked);
        console.log(it.value);
        featuresChecked.push(it.value);
      }
      console.log(featuresChecked);
      return featuresChecked;
    });
  };
  // var getFeaturesChecked = function (arr) {
  //   var featuresChecked = [];
  //   arr.forEach(function (it) {
  //     if (it.checked) {
  //       console.log(it.checked);
  //       console.log(it.value);
  //       featuresChecked.push(it.value);
  //     }
  //     console.log(featuresChecked);
  //     return featuresChecked;
  //   });
  // };



  var getFilterData = function (evt) {
    var filterData = window.data.get().slice();
    switch (evt.target.id) {
      case Filter.TYPE:
        filterData = filterValue(filterData, 'type', Filter.TYPE);
        break;
      case Filter.ROOMS:
        filterData = filterValue(filterData, 'rooms', Filter.ROOMS);
        break;
      case Filter.GUESTS:
        filterData = filterValue(filterData, 'guests', Filter.GUESTS);
        break;
      case Filter.PRICE:
        filterData = filterValuePrice(filterData, 'price', Filter.PRICE);
        break;
      case featuresList:
        // filterData = filterValuePrice(filterData, 'price', Filter.PRICE);
        filterData = featuresList;
        break;
    }
    // getFeaturesChecked(filterData)
    // getFeaturesChecked().forEach(function (it) {
    //   filterData = filterByFeatures(filterData, item.value);
    // });
    // filterData = filterValuePrice(filterData, 'price', Filter.PRICE);
    // filterData = getFeaturesChecked(filterData);
    return filterData;
  };



  filtersMap.addEventListener('change', function (evt) {
    console.log(evt.target.id + ' обработчик')
    window.map.checkingForCard();
    getFilterData(evt);
    window.pin.renderPinMap(getFilterData(evt));
  });

  // console.log(featuresList);
  var filterReset = function () {
    filtersMap.reset();
  };

  window.filter = {
    filterReset: filterReset
  };
})();

