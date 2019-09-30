'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var INDENT_GAP = 35;
var TIME_GAP = 30;
var BAR_GAP = 50;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  var maxTime = Math.max.apply(null, times);

  ctx.fillStyle = '#000000';
  ctx.font = '16px  PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + INDENT_GAP, CLOUD_Y + INDENT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + INDENT_GAP, CLOUD_Y + INDENT_GAP + FONT_GAP);

  players.forEach(function (j, i) {
    ctx.fillStyle = '#000';
    ctx.fillText(j, CLOUD_X + GAP + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.ceil(times[i]), CLOUD_X + GAP + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime - TIME_GAP);
    if (j === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,' + Math.random() * 100 + '%' + ',50%)';
    }
    ctx.fillRect(CLOUD_X + GAP + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime - FONT_GAP - GAP, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  });
};
