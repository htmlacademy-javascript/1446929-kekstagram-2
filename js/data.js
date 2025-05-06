import {randomNumber, getRandomArrayItem} from './util.js';

const PHOTO_COUNT = 25;

const Likes = {
  MIN: 15,
  MAX: 200
};

const Comments = {
  MIN: 0,
  MAX: 30
};

const IDs = {
  MIN: 1,
  MAX: 200
};

const Avatars = {
  MIN: 1,
  MAX: 6
};

const photoDescription = 'Фотография пользователя';

const names = [
  'Алиса',
  'Геннадий',
  'Жора',
  'Иришка',
  'Димитрий',
  'Мадлен',
  'Аристарх',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];


const addComment = () => ({
  id: randomNumber(IDs.MIN, IDs.MAX),
  avatar: `img/avatar-${randomNumber(Avatars.MIN , Avatars.MAX)}.svg`,
  message: getRandomArrayItem(messages),
  name: getRandomArrayItem(names)
});

const addComments = () => {
  const comments = [];

  for (let i = 0; i < randomNumber(Comments.MIN , Comments.MAX); i++) {
    comments.push(addComment());
  }

  return comments;
};

const addPhoto = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: `${photoDescription}`,
  likes: randomNumber(Likes.MIN, Likes.MAX),
  comments: addComments()
});

const addPhotos = () => {
  const photos = [];

  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push(addPhoto(i));
  }
  return photos;
};


export {addPhotos};
