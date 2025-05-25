import { toggleClass, isEscapeKey } from './util.js';

const fullSizePhotoContainer = document.querySelector('.big-picture');
const fullSizePhoto = fullSizePhotoContainer.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentCount = document.querySelector('.social__comment-count');
const userCommentsContainer = document.querySelector('.social__comments');
const userComment = userCommentsContainer.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const caption = document.querySelector('.social__caption');
const closeBtn = document.querySelector('#picture-cancel');

const commentFragment = document.createDocumentFragment();
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

  commentCount.innerHTML = `${currentComments.length} из <span class="social__comment-total-count">${currentComments.length}</span> комментариев`;

  currentComments.forEach((comment) => {
    commentFragment.appendChild(renderComment(comment));
  });

  userCommentsContainer.appendChild(commentFragment);
};

function closeFullSizePhoto() {
  document.removeEventListener('keydown', onFullSizePhotoEscKey);
  toggleModal();
}

const onCloseFullSizePhoto = () => {
  closeFullSizePhoto();
};

function onFullSizePhotoEscKey(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePhoto();
  }
}

const renderFullSizePhoto = (photo) => {
  currentComments = photo.comments.slice();
  show(photo);
  renderComments();
  document.addEventListener('keydown', onFullSizePhotoEscKey);
  toggleModal();
  commentsLoader.classList.add('hidden');
};

closeBtn.addEventListener('click', onCloseFullSizePhoto);

export { renderFullSizePhoto };
