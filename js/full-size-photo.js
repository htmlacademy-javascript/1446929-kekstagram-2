import { toggleClass, isEscapeKey } from './util.js';

const COMMENT_STEP = 5;

const fullSizePhotoContainer = document.querySelector('.big-picture');
const fullSizePhoto = fullSizePhotoContainer.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentCount = document.querySelector('.social__comment-count');
const userCommentsContainer = document.querySelector('.social__comments');
const userComment = userCommentsContainer.querySelector('.social__comment');
const commentsLoaderButton = document.querySelector('.comments-loader');
const caption = document.querySelector('.social__caption');
const closeButton = document.querySelector('.big-picture__cancel');

const commentFragment = document.createDocumentFragment();

let commentsCount = COMMENT_STEP;
let currentComments = [];

const toggleModal = () => {
  toggleClass(fullSizePhotoContainer, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const show = (photo) => {
  const { url, likes, description } = photo;
  fullSizePhoto.src = url;
  likesCount.textContent = likes;
  caption.textContent = description;
};

const renderComment = (comment) => {
  const newComment = userComment.cloneNode(true);
  const avatar = newComment.querySelector('.social__picture');

  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

const renderComments = () => {
  userCommentsContainer.innerHTML = '';
  commentCount.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  commentCount.innerHTML = `${commentsCount} из <span class="social__comment-total-count">${currentComments.length}</span> комментариев`;

  for (let i = 0; i < commentsCount; i++) {
    commentFragment.appendChild(renderComment(currentComments[i]));
  }

  if (currentComments.length <= COMMENT_STEP || commentsCount >= currentComments.length) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

  userCommentsContainer.appendChild(commentFragment);
};

const onCloseFullSizePhotoClick = () => {
  closeFullSizePhoto();
};

const onFullSizePhotoEscKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePhoto();
  }
};

function closeFullSizePhoto() {
  commentsCount = COMMENT_STEP;
  toggleModal();
  document.removeEventListener('keydown', onFullSizePhotoEscKey);
}

const onCommentsLoaderButtonClick = () => {
  commentsCount += COMMENT_STEP;
  renderComments();
};

const renderFullSizePhoto = (photo) => {
  currentComments = photo.comments.slice();
  show(photo);
  renderComments();
  toggleModal();
  document.addEventListener('keydown', onFullSizePhotoEscKey);
};

commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
closeButton.addEventListener('click', onCloseFullSizePhotoClick);


export { renderFullSizePhoto };
