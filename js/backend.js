'use strict';

(function () {

  var SUCCESS = 200;
  var SEC = 10000; // 10s
  var loadURL = 'https://js.dump.academy/code-and-magick/data';
  var saveURL = 'https://js.dump.academy/code-and-magick';
  var loadMetod = 'GET';
  var saveMetod = 'POST';

  window.loadAndSave = function (onSuccess, onError, URL, metod, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (true) {
        case ((xhr.status === SUCCESS) && (metod === 'POST')):
          window.closePopup();
          onSuccess(xhr.response);
          break;

        case (xhr.status === SUCCESS):
          onSuccess(xhr.response);
          break;

        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = SEC;

    xhr.open(metod, URL);
    xhr.send(data);
  };

  window.loadAndSave(window.setup.successHandler, window.setup.errorHandler, loadURL, loadMetod);

  window.util.setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(window.util.setupForm);
    window.loadAndSave(window.setup.successHandler, window.setup.errorHandler, saveURL, saveMetod, formData);
  });
})();
