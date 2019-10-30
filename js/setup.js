'use strict';

var QUANTITY_MAGES = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var wizardName = document.querySelector('.setup-user-name');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var fireballColor = document.querySelector('input[name=fireball-color]');
var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var getRandomElement = function (random) {
  var rand = Math.floor(Math.random() * random.length);
  return random[rand];
};

var generateWizards = function () {
  var indexObjects = Array.from(Array(QUANTITY_MAGES).keys());
  var wizards = indexObjects.map(function () {
    return {
      name: getRandomElement(WIZARD_NAMES),
      surname: getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(WIZARD_COATCOLORS),
      eyesColor: getRandomElement(WIZARD_EYESCOLORS)
    };
  });

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function () {
  var fragment = document.createDocumentFragment();
  var wizards = generateWizards();

  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });
  similarListElement.appendChild(fragment);
};
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== wizardName) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  var setupSimilarItem = document.querySelectorAll('.setup-similar-item');
  if (setupSimilarItem.length < QUANTITY_MAGES) {
    renderWizards();
  }
};

var closePopup = function () {
  setup.classList.add('hidden');
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
  wizardCoat.style.fill = getCoatElement(WIZARD_COATCOLORS);
  document.querySelector('input[name="coat-color"]').setAttribute('value', getCoatElement(WIZARD_COATCOLORS));
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getEyesElement(WIZARD_EYESCOLORS);
  document.querySelector('input[name="eyes-color"]').setAttribute('value', getEyesElement(WIZARD_EYESCOLORS));
});

wizardFireball.addEventListener('click', function () {
  var fireColor = getFireballElement(WIZARD_FIREBALL);
  wizardFireball.style.background = fireColor;
  fireballColor.value = fireColor;
});
