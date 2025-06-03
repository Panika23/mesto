import {cardSave} from './index.js'

// Функция перебора form
function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement,settings);
    })
  }
  
  // Функция перебора input-form
  function setEventListeners(formElement,settings) {
    const  inputList = Array.from(formElement.querySelectorAll(settings.inputSelector))
    const buttonElement = formElement.querySelector(settings.submitButtonSelector); 
    if (formElement==cardSave) {
      toggleButtonState(inputList, buttonElement, settings);
    }
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement, settings);
          toggleButtonState(inputList, buttonElement, settings);
        });
    });
  };
  
  // Функция показа ошибки валидации
  function showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }
  // Функция скрытия ошибки валидации
  function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  }
  
  // Функция для проверки валидности формы
  const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage,settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };
  
  // Функция проверки полей на валидность
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  // Функция выключения кнопки
  function toggleButtonState(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {  // Если есть хотя бы одно невалидное поле
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {  // Если все поля валидны
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  
  export {
    enableValidation,
    setEventListeners,
    showInputError,
    hideInputError,
    checkInputValidity,
    hasInvalidInput,
    toggleButtonState
  };