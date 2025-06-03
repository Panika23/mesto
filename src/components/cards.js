import { openModal, closeModal } from "./modal.js";
import {
  setImageAttributes,
  appendCardToDOM,
  handleLikeButtonClick,
  handleDeleteButtonClick,
  openImagePopup,
} from "./index.js";
// import { getUser, getCards, updateUser, addCards, deleteCards } from './api.js';

// @todo: Темплейт карточки
const template = document.querySelector("#card-template");

const imagePopup = document.querySelector(".popup_type_image");

function createCard(name, link, isUserCard, likes, cardId,  currentUserId) {
  const item = template.content.cloneNode(true);
  let img = item.querySelector(".card__image");
  let title = item.querySelector(".card__title");
  let quantityLikes = item.querySelector('.card__quantity-likes');
  
  // Установка атрибутов изображения и текста
  setImageAttributes(img, link, name);
  title.textContent = name;
  quantityLikes.textContent = likes.length;
  
  const btnCardLikes = item.querySelector(".card__like-button");
   // Проверяем, лайкнул ли текущий пользователь карточку
   const isLiked = likes.some(like => like._id === currentUserId);
   if (isLiked) {
     btnCardLikes.classList.add("card__like-button_is-active");
   }
  // Обработчик события открытия поп-апа с картинкой
  img.addEventListener("click", () => openImagePopup(link, name));

  // Функция закрытия изображения карточки
  const btnImgClose = imagePopup.querySelector(".popup__close");
  btnImgClose.addEventListener("click", () => closeModal(imagePopup));

  // Обработaчик лайка
  btnCardLikes.addEventListener("click", (evt) => handleLikeButtonClick(evt, cardId, quantityLikes));

  // // Обработчик удаления карточки
  const btnCardDelete = item.querySelector(".card__delete-button");
  // Размещение карточки в DOM
  appendCardToDOM(item, isUserCard);

  return { item, btnCardDelete }; 
}


export {createCard};
