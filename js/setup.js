'use strict';
var OBJECTS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var wisardRandom = function wisardRandElement(random) {
  var rand = Math.floor(Math.random() * random.length);
  return random[rand];
};
var indexObjects = Array.from(Array(OBJECTS).keys());
var wizards = [];

indexObjects.forEach(function (j, i) {

  wizards[i] = {
    name: wisardRandom(WIZARD_NAMES),
    surname: wisardRandom(WIZARD_SURNAMES),
    coatColor: wisardRandom(WIZARD_COATCOLORS),
    eyesColor: wisardRandom(WIZARD_EYESCOLORS)
  };
  wizards.push(wizards[i]);
});
wizards.pop();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
wizards.forEach(function (j, i) {
  var index = i;
  fragment.appendChild(renderWizard(wizards[index]));
});
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var wizardName = document.querySelector('.setup-user-name');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var wizardCoat = document.querySelector('#wizard-coat');
var wizardEyes = document.querySelector('#wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var fireballColor = document.querySelector('input[name=fireball-color]');

var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== wizardName) {
    closePopup();
  }
};

var openPopup = function() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function() {
  openPopup();
});

setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function() {
  closePopup();
});

setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardCoat.addEventListener('click', function() {
  wizardCoat.style.fill = wisardRandom(WIZARD_COATCOLORS);
});

wizardEyes.addEventListener('click', function() {
  wizardEyes.style.fill = wisardRandom(WIZARD_EYESCOLORS);
});

wizardFireball.addEventListener('click', function() {
  var fireColor = wisardRandom(WIZARD_FIREBALL);
  wizardFireball.style.background = fireColor;
  fireballColor.value = fireColor;
});
