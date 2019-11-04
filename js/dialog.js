'use strict';

(function () {
  var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var wizardName = document.querySelector('.setup-user-name');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.util.userDialog.querySelector('.setup-close');
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var fireballColor = document.querySelector('input[name=fireball-color]');
  var dialogHandler = window.util.userDialog.querySelector('.upload');
  window.util.userDialog.querySelector('.setup-similar').classList.remove('hidden');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== wizardName) {
      closePopup();
    }
  };

  var openPopup = function () {
    window.util.userDialog.classList.remove('hidden');
    window.util.userDialog.removeAttribute('style');
    document.addEventListener('keydown', onPopupEscPress);
    var setupSimilarItem = document.querySelectorAll('.setup-similar-item');
    if (setupSimilarItem.length < window.util.QUANTITY_MAGES) {
      window.renderWizards();
    }
  };

  var closePopup = function () {
    window.util.userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var getEyesElement = function (array) {
    var eyesAttribute = document.querySelector('input[name="eyes-color"]').getAttribute('value');
    var ind;

    array.forEach(function (j, i) {
      if (j === eyesAttribute && i < array.length) {
        ind = i + 1;
      }
    });
    if (ind >= array.length) {
      ind = 0;
    }
    return array[ind];
  };

  var getCoatElement = function (array) {
    var coatAttribute = document.querySelector('input[name="coat-color"]').getAttribute('value');
    var ind;

    array.forEach(function (j, i) {
      if (j === coatAttribute && i < array.length) {
        ind = i + 1;
      }
    });
    if (ind >= array.length) {
      ind = 0;
    }
    return array[ind];
  };

  var getFireballElement = function (array) {
    var fireballAttribute = document.querySelector('input[name="fireball-color"]').getAttribute('value');
    var ind;

    array.forEach(function (j, i) {
      if (j === fireballAttribute && i < array.length) {
        ind = i + 1;
      }
    });
    if (ind >= array.length) {
      ind = 0;
    }
    return array[ind];
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = getCoatElement(window.util.WIZARD_COATCOLORS);
    document.querySelector('input[name="coat-color"]').setAttribute('value', getCoatElement(window.util.WIZARD_COATCOLORS));
  });

  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = getEyesElement(window.util.WIZARD_EYESCOLORS);
    document.querySelector('input[name="eyes-color"]').setAttribute('value', getEyesElement(window.util.WIZARD_EYESCOLORS));
  });

  wizardFireball.addEventListener('click', function () {
    var fireColor = getFireballElement(WIZARD_FIREBALL);
    wizardFireball.style.background = fireColor;
    fireballColor.value = fireColor;
  });

  // передвижение диалогового окна
  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.util.userDialog.style.top = (window.util.userDialog.offsetTop - shift.y) + 'px';
      window.util.userDialog.style.left = (window.util.userDialog.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtAvatar) {
          evtAvatar.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

