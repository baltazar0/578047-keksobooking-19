'use strict';

(function () {
  var URL = {
    // SAVE: 'https://js.dump.academy/code-and-magick',
    LOAD: 'https://js.dump.academy/keksobooking/data'
  };
  var TIMEOUT = 1000;
  var ErrorCode = {
    SUCCESS: 200,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };
  var ErrorMessage = {
    MOVED_PERMANENTLY: 'Ресурс перемещен навсегда',
    FOUND: 'Ресурс временно перемещен.',
    BAD_REQUEST: 'Неверный запрос.',
    UNAUTHORIZED: 'Неавторизованный запрос.',
    NOT_FOUND: 'Запрашиваемый документ не найден.',
    SERVER_ERROR: 'Внутренняя ошибка сервера.'
  };
  var Error = {
    CONNECT: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за '
  };
  var TIME_UNIT = 'мс';

  var request = function (metod, url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case ErrorCode.SUCCESS:
          onLoad(xhr.response);
          break;
        case ErrorCode.MOVED_PERMANENTLY:
          onError(ErrorMessage.MOVED_PERMANENTLY);
          break;
        case ErrorCode.FOUND:
          onError(ErrorMessage.FOUND);
          break;
        case ErrorCode.BAD_REQUEST:
          onError(ErrorMessage.BAD_REQUEST);
          break;
        case ErrorCode.UNAUTHORIZED:
          onError(ErrorMessage.UNAUTHORIZED);
          break;
        case ErrorCode.NOT_FOUND:
          onError(ErrorMessage.NOT_FOUND);
          break;
        case ErrorCode.SERVER_ERROR:
          onError(ErrorMessage.SERVER_ERROR);
          break;
        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(Error.CONNECT);
    });

    xhr.timeout = TIMEOUT;
    xhr.addEventListener('timeout', function () {
      onError(Error.TIMEOUT + xhr.timeout + TIME_UNIT);
    });

    xhr.open(metod, url);
    xhr.send(data);
  };

  // var save = function (data, onLoad, onError) {
  //   request('POST', URL.SAVE, data, onLoad, onError);
  // };

  var load = function (onLoad, onError) {
    request('GET', URL.LOAD, null, onLoad, onError);
  };

  window.backend = {
    // save: save,
    load: load
  };
})();
