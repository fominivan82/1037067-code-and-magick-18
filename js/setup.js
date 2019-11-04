'use strict';

(function () {

  var QUANTITY_MAGES = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var similarListElement = window.util.userDialog.querySelector('.setup-similar-list');
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
        coatColor: getRandomElement(window.util.WIZARD_COATCOLORS),
        eyesColor: getRandomElement(window.util.WIZARD_EYESCOLORS)
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

  window.renderWizards = function () {
    var fragment = document.createDocumentFragment();
    var wizards = generateWizards();

    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });
    similarListElement.appendChild(fragment);
  };
})();
