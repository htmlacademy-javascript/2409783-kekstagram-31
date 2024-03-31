const form = document.querySelector('.img-upload__form');

const imagePreview = form.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const imageScale = form.querySelector('.img-upload__scale');
const scaleValue = imageScale.querySelector('.scale__control--value');
const smallerScale = imageScale.querySelector('.scale__control--smaller');
const biggerScale = imageScale.querySelector('.scale__control--bigger');

const effectContainer = form.querySelector('.img-upload__effect-level');
const effectValue = effectContainer.querySelector('.effect-level__value');
const effectSlider = effectContainer.querySelector('.effect-level__slider');
const effectsList = form.querySelector('.effects__list');

let effectName;

const effectsOptions = {
  'chrome': [0, 1, 0.1, ''],
  'sepia': [0, 1, 0.1, ''],
  'marvin': [0, 100, 1, '%'],
  'phobos': [0, 3, 0.1, 'px'],
  'heat': [0, 3, 0.1, ''],
};

const changeScale = (step) => {
  const scaleValueNumber = Number(scaleValue.value.slice(0, -1));
  let newScaleValue = scaleValueNumber;
  if (scaleValueNumber + step <= 100 && scaleValueNumber + step >= 25) {
    newScaleValue += step;
  }
  scaleValue.value = `${newScaleValue}%`;
  newScaleValue = newScaleValue / 100;
  newScaleValue = parseFloat(newScaleValue.toFixed(2));
  image.style.transform = `scale(${newScaleValue})`;
};

const onBiggerScaleClick = () => changeScale(25);

const onSmallerScaleClick = () => changeScale(-25);

const addScaleListeners = () => {
  scaleValue.value = '100%';
  image.style.transform = 'scale(1)';
  biggerScale.addEventListener('click', onBiggerScaleClick);
  smallerScale.addEventListener('click', onSmallerScaleClick);
};

const removeScaleListeners = () => {
  biggerScale.removeEventListener('click', onBiggerScaleClick);
  smallerScale.removeEventListener('click', onSmallerScaleClick);
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  format: {
    to:function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

const changeEffect = (effect, value) => {
  const options = effectsOptions[effect];
  switch(effect) {
    case 'none':
      image.style.filter = 'none';
      break;
    case 'chrome':
      image.style.filter = `grayscale(${value}${options[3]})`;
      break;
    case 'sepia':
      image.style.filter = `sepia(${value}${options[3]})`;
      break;
    case 'marvin':
      image.style.filter = `invert(${value}${options[3]})`;
      break;
    case 'phobos':
      image.style.filter = `blur(${value}${options[3]})`;
      break;
    case 'heat':
      image.style.filter = `brightness(${value}${options[3]})`;
      break;
  }
};

const updateEffectOptions = (effect) => {
  const options = effectsOptions[effect];
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: options[0],
      max: options[1]
    },
    start: options[1],
    step: options[2]
  });
  effectValue.value = options[1];
  changeEffect(effect, options[1]);
};

const applyOriginalEffect = () => {
  effectContainer.classList.add('visually-hidden');
  effectValue.value = '';
  changeEffect('none', 0);
};

const onSliderChange = () => {
  effectValue.value = effectSlider.noUiSlider.get();
  changeEffect(effectName, effectValue.value);
};

const onRadioClick = (evt) => {
  if(evt.target.value){
    effectName = evt.target.value;
    if (effectName !== 'none') {
      effectContainer.classList.remove('visually-hidden');
      updateEffectOptions(effectName);
    } else {
      applyOriginalEffect();
    }
  }
};

const addEffects = () => {
  applyOriginalEffect();
  effectsList.addEventListener('click', onRadioClick);
  effectSlider.noUiSlider.on('slide', onSliderChange);
};

const removeEffects = () => {
  effectsList.removeEventListener('click', onRadioClick);
  effectSlider.noUiSlider.off();
};

export {addScaleListeners, removeScaleListeners, addEffects, removeEffects};
