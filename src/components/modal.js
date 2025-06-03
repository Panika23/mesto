// Функция окрытия окна
function openModal(popup) {
    popup.classList.add("popup_is-opened");
    popup.classList.add("popup_is-animated");
    document.addEventListener('keydown', closeByEsc); 
  }
  // Функция закрытия окна
  function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', closeByEsc); 
  }

  // Функция закрытия popap через Esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');       
      closeModal(openedPopup);
    } 
  }

  export {openModal, closeModal, closeByEsc}