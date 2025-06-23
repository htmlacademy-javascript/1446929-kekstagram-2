const SCALE_STEP = 25;

const Scale = {
  MIN: 25,
  MAX: 100
};

const scaleValueField = document.querySelector('.scale__control--value');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const preview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const effectItems = document.querySelectorAll('.effects__radio');

let currentScale = Number.parseInt(scaleValueField.value, 10);
let currentEffect = null;

const effects = [
  {
    name: 'chrome',
    options: {
      range: {
        min: 0,
        max: 1
      },
      start: 0,
      step: 0.1
    },
    setFilter: (value) => `grayscale(${value})`
  },
  {
    name: 'sepia',
    options: {
      range: {
        min: 0,
        max: 1
      },
      start: 0,
      step: 0.1
    },
    setFilter: (value) => `sepia(${value})`
  },
  {
    name: 'marvin',
    options: {
      range: {
        min: 0,
        max: 100
      },
      start: 0,
      step: 1
    },
    setFilter: (value) => `invert(${value}%)`
  },
  {
    name: 'phobos',
    options: {
      range: {
        min: 0,
        max: 3
      },
      start: 0,
      step: 0.1
    },
    setFilter: (value) => `blur(${value}px)`
  },
  {
    name: 'heat',
    options: {
      range: {
        min: 1,
        max: 3
      },
      start: 1,
      step: 0.1
    },
    setFilter: (value) => `brightness(${value})`
  },
];

const changeScale = () => {
  if (currentScale < Scale.MIN) {
    currentScale = Scale.MIN;
  }

  if (currentScale > Scale.MAX) {
    currentScale = Scale.MAX;
  }

  scaleValueField.value = `${currentScale}%`;
  preview.style.transform = `scale(${currentScale / 100})`;
};

const resetScale = () => {
  currentScale = Scale.MAX;
  preview.style.transform = `scale(${currentScale / 100})`;
};

const resetSlider = () => {
  currentEffect = null;
  sliderContainer.style.display = 'none';
  preview.style.filter = '';
};

const onScaleDown = () => {
  currentScale -= SCALE_STEP;
  changeScale();
};

const onScaleUp = () => {
  currentScale += SCALE_STEP;
  changeScale();
};

function onEffectItemClick() {
  currentEffect = effects.find((effect) => effect.name === this.value);
  if (!currentEffect) {
    resetSlider();
    return;
  }
  sliderContainer.style.display = '';
  sliderElement.noUiSlider.updateOptions(currentEffect.options);
  preview.style.filter = currentEffect.setFilter(currentEffect.options.range.max);
  sliderElement.noUiSlider.set(Scale.MAX);
}

const updateScale = () => {
  scaleUpButton.addEventListener('click', onScaleUp);
  scaleDownButton.addEventListener('click', onScaleDown);
};


const updateEffect = () => {

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    }
  });

  sliderElement.noUiSlider.on('update', () => {
    if (currentEffect) {
      effectLevel.value = sliderElement.noUiSlider.get();
      preview.style.filter = currentEffect.setFilter(effectLevel.value);
    }
  });

  effectItems.forEach((item) => item.addEventListener('click', onEffectItemClick));
};


export { updateScale, resetScale, updateEffect, resetSlider };
