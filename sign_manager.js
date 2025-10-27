document.querySelectorAll('input[type="range"]').forEach(range => {
  range.addEventListener('input', (event) => {
    const sender = event.target;
    const signboxId = 'signbox' + sender.id.replace('temp', '');
    const signbox = document.getElementById(signboxId);

    if (signbox) {
      signbox.querySelectorAll('.sign').forEach(sign => {
        sign.style.opacity = 0;
        sign.style.pointerEvents = 'none';
      });
      const value = parseInt(sender.value);
      const sign = signbox.querySelector(`.sign[data-index="${value}"]`);
      if (sign) {
        sign.textContent = sign.dataset.index;
        sign.style.pointerEvents = 'auto';
        sign.style.opacity = 1;
      }
    }
  });
});

window.processRangeValues = function () {
  const ranges = document.querySelectorAll('input[type="range"]');
  let sumBase = 0;

  ranges.forEach(range => {
    if (range.id !== 'temp5') {
      sumBase += Number(range.value);
    }
  });

  const base = sumBase * 1.4;

  const lastRange = document.getElementById('temp5');
  if (!lastRange) {
    console.error('Не найден слайдер temp5');
    return;
  }
  const vibeValue = Number(lastRange.value);
  const multiplier = 1 + (vibeValue - 1) * 0.06747;

  const rawScore = base * multiplier;

  let rating = Math.floor(rawScore / 9);

  rating = Math.max(rating, 1);

  rating = Math.min(rating, 10);


  const ratingBox = document.getElementById('rating_num');
  const markBox = document.getElementById('mark');
  updateRatingColor(rating);

  const labels = [
    { min: 10, text: 'Эпик Вин' },
    { min: 9, text: 'Великолепно' },
    { min: 8, text: 'Отлично' },
    { min: 7, text: 'Хорошо' },
    { min: 6, text: 'Нормально' },
    { min: 5, text: 'Более-менее' },
    { min: 4, text: 'Плохо' },
    { min: 3, text: 'Очень плохо' },
    { min: 2, text: 'Ужасно' },
    { min: 0, text: 'Хуже некуда' }
  ];
  const mark = labels.find(l => rating >= l.min).text;

  ratingBox.textContent = rating;
  markBox.textContent = mark;
}

function updateRatingColor(rating) {
  const minRating = 0;
  const maxRating = 10;

  const normalized = Math.min(Math.max(rating / maxRating, 0), 1);

  const startColor = [188, 71, 73];   // #BC4749 (RGB)
  const endColor = [106, 153, 78];    // #6A994E (RGB)

  const currentColor = startColor.map((channel, index) => {
    return Math.round(channel + (endColor[index] - channel) * normalized);
  });

  const hexColor = `#${currentColor.map(c =>
    c.toString(16).padStart(2, '0')).join('')}`;

  const ratingBar = document.querySelector('.c_rating_red_box');
  ratingBar.style.backgroundColor = hexColor;
}

/*
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type="range"]').forEach(range => {
      range.dispatchEvent(new Event('input'));
  });
  document.querySelectorAll('input[type="range"]').forEach(range => {
      range.addEventListener('input', processRangeValues);
  });
  processRangeValues();
});
*/

function initializeRatingWidget() {
  document.querySelectorAll('input[type="range"]').forEach(range => {
    range.dispatchEvent(new Event('input'));
  });
  document.querySelectorAll('input[type="range"]').forEach(range => {
    range.addEventListener('input', processRangeValues);
  });
  processRangeValues();
}

setTimeout(initializeRatingWidget, 100);