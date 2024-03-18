const form = document.querySelector('.img-upload__form');

const imagePreview = form.querySelector('.img-upload__preview');
const imageScale = form.querySelector('.img-upload__scale');
const scaleValue = imageScale.querySelector('.scale__control--value');
const smallerScale = imageScale.querySelector('.scale__control--smaller');
const biggerScale = imageScale.querySelector('.scale__control--bigger');

const effectValue = form.querySelector('.effect-level__value');
const effectSlider = form.querySelector('.effect-level__slider');

biggerScale.addEventListener('click', () => {
  const scaleValueNumber = Number(scaleValue.value.slice(0, -1));
  let newScaleValue = scaleValueNumber;
  if (scaleValueNumber < 100) {
    newScaleValue += 25;
  }
  scaleValue.value = String(newScaleValue) + '%';
  newScaleValue = newScaleValue / 100;
  newScaleValue = parseFloat(newScaleValue.toFixed(2));
  imagePreview.style.transform = `scale(${newScaleValue})`;
})

smallerScale.addEventListener('click', () => {
  const scaleValueNumber = Number(scaleValue.value.slice(0, -1));
  let newScaleValue = scaleValueNumber;
  if (scaleValueNumber > 25) {
    newScaleValue -= 25;
  }
  scaleValue.value = String(newScaleValue) + '%';
  newScaleValue = newScaleValue / 100;
  newScaleValue = parseFloat(newScaleValue.toFixed(2));
  imagePreview.style.transform = `scale(${newScaleValue})`;
})

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
});
