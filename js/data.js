import {getRandomInteger, getRandomElement, getUniqueRandomInteger} from './util.js';

const PHOTO_AMOUNT = 25;

const MIN_COMMENT_AMOUNT = 0;
const MAX_COMMENT_AMOUNT = 30;

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const DESCRIPTIONS = [
  'Описание фотографии',
  'Ещё одно описание фотографии',
  'Совсем другое описание совсем другой фотографии',
  'Я даже не знаю какое придумать описание к этой фотографии!',
  'Котики)'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Константин',
  'Матвей' ,
  'Иван',
  'Анатолий',
  'Сергей',
  'Екатерина',
  'Валерия',
  'Инга',
  'Аида',
  'Марина'
];

const getUniqueCommentId = getUniqueRandomInteger(1000, 2000);

const createComment = () => {
  const uniqueId = getUniqueCommentId();

  return {
    id: uniqueId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomElement(MESSAGES),
    name: getRandomElement(NAMES),
  };
};

const getUniquePublicationId = getUniqueRandomInteger(1, PHOTO_AMOUNT);

const createPublication = () => {
  const commentsNumber = getRandomInteger(MIN_COMMENT_AMOUNT, MAX_COMMENT_AMOUNT);
  const uniqueId = getUniquePublicationId();

  return {
    id: uniqueId,
    url: `photos/${uniqueId}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: commentsNumber}, createComment),
  };
};

const createPublications = () => Array.from({length: PHOTO_AMOUNT}, createPublication);

export{createPublications};
