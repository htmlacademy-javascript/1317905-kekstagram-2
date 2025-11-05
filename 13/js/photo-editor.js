const uploadForm = document.querySelector('.img-upload__form');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');

// Элементы масштабирования
const scaleControlValue = uploadForm.querySelector('.scale__control--value');


// Элементы эффектов
const effectsList = uploadForm.querySelector('.effects__list');
const effectLevelContainer = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');

let currentScale = 100;

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

// Эффекты
const effectSettings = {
  none: {
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const updateScale = (value) => {
  currentScale = value;
  scaleControlValue.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};


const onScaleSmaller = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScale(currentScale);
  }
};


const onScaleBigger = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScale(currentScale);
  }
};


const resetScaleEditor = () =>{
  currentScale = 100;
  updateScale(currentScale);
};


//Создаем слайдер
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => {
      const effect = document.querySelector('.effects__radio:checked').value || 'none';
      return effectSettings[effect].step === 1 ? Math.round(value) : Number(value.toFixed(1));
    },
    from: (value) => parseFloat(value)
  }

});


//Применяем эффект
const applyEffect = (effect, value) => {
  if (effect === 'none') {
    imagePreview.style.filter = 'none';
    effectLevelContainer.classList.add('hidden');
    effectLevelValue.value = '';
  } else {
    const { filter, unit } = effectSettings[effect];
    imagePreview.style.filter = `${filter}(${value}${unit})`;
    effectLevelContainer.classList.remove('hidden');
    effectLevelValue.value = value;
  }
};

// Функция для сброса и обновления слайдера
const resetSlider = (effect) => {
  const {min, max, step} = effectSettings[effect];

  effectLevelSlider.noUiSlider.updateOptions ({
    range: {
      min, max,
    },
    step,
    start: max
  });
  applyEffect(effect, max);
};


effectsList.addEventListener('change', (evt)=> {
  const radio = evt.target.closest('.effects__radio');
  const effect = radio.value;
  resetSlider(effect);
});


effectLevelSlider.noUiSlider.on('update', () => {
  const value = effectLevelSlider.noUiSlider.get();
  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  applyEffect(selectedEffect, value);
});


export { onScaleSmaller, onScaleBigger, resetScaleEditor, resetSlider };
